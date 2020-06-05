import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { uniq, without } from 'lodash';

import IProject from 'src/app/shared/interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsCollection: AngularFirestoreCollection<IProject>
  projects$: Observable<IProject[]>
  projectDoc: AngularFirestoreDocument<IProject>

  currentProjectSub = new BehaviorSubject<IProject>(null);
  currentProject$ = this.currentProjectSub.asObservable()
    .pipe(filter(user => !!user));

  constructor(
    private afs: AngularFirestore,
  ) {
    this.projectsCollection = this.afs.collection('projects')
    this.projects$ = this.projectsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IProject
          data.uid = a.payload.doc.id
          return data
        })
      })
    )

    this.projects$.subscribe(projects => {
      if (this.currentProjectSub.getValue()) {
        this.currentProjectSub.next(
          projects.find(project => project.uid === this.currentProjectSub.getValue().uid)
        );
      }
    });

  }

  getAllProjects(): Observable<any> {
    return this.projects$;
  }

  getProjectsByUserId(userId: string) {
    return this.afs.collection('projects', ref => ref.where('participants', 'array-contains', userId))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as IProject
            data.uid = a.payload.doc.id
            return data
          })
        })
      )
  }

  getCurrentProject(): Observable<IProject> {
    return this.currentProjectSub;
  }

  setCurrentProject(project: IProject) {
    this.currentProjectSub.next(project);
  }

  setUsersToProject(usersUids: string[]): void {
    this.currentProject$
      .subscribe((project: IProject) => {
        const participants: string[] = uniq([
          ...project.participants,
          ...usersUids,
        ]);

        this.projectDoc = this.afs.doc(`projects/${project.uid}`);
        this.projectDoc.update({ participants: participants });
      })
  }

  addProject(project: IProject): Promise<DocumentReference> {
    return this.projectsCollection.add(project);
  }

  addMeetingToProject(meetingId: string): void {
    this.currentProject$
      .subscribe((project: IProject) => {
        const meetings: string[] = uniq([
          ...project.meetings || [],
          meetingId,
        ]);

        this.projectDoc = this.afs.doc(`projects/${project.uid}`);
        this.projectDoc.update({ meetings });
      });
  }

  deleteMeetingFromProject(meetingId: string): void {
    this.currentProject$
      .subscribe((project: IProject) => {
        const meetings: string[] = without(project.meetings, meetingId);

        this.projectDoc = this.afs.doc(`projects/${project.uid}`);
        this.projectDoc.update({ meetings });
      });
  }

  deleteProject(project: IProject): void {
    this.projectDoc = this.afs.doc(`projects/${project.uid}`)
    this.projectDoc.delete()
  }

  removeParticipant(uid: string): void {
    this.currentProject$
      .subscribe((project: IProject) => {
        const participants: string[] = project.participants.filter(el => el !== uid);

        this.projectDoc = this.afs.doc(`projects/${project.uid}`);
        this.projectDoc.update({ participants: participants });
      })
  }
}
