import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IProject, IProjectShort } from '../interfaces/Project';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsCollection: AngularFirestoreCollection<IProject>
  projects: Observable<IProject[]>
  projectDoc: AngularFirestoreDocument<IProject>

  currentProjectSub = new BehaviorSubject<IProjectShort>(null);
  currentProject$ = this.currentProjectSub.asObservable();

  constructor (
    private afs: AngularFirestore,
    ) {
    this.projectsCollection = this.afs.collection('projects')
    this.projects = this.projectsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IProject
          data.uid = a.payload.doc.id
          return data
        })
      })
    )

    this.projects.subscribe();
  }

  getProjectsByUserId(userId: string) {
    return this.afs.collection('projects', ref => ref.where('participants', 'array-contains', userId ))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as IProjectShort
            data.uid = a.payload.doc.id
            return data
          })
        })
      )
  }

  setCurrentProject(project: IProjectShort) {
    this.currentProjectSub.next(project);
  }

  setUsersToProject(usersUids: string[]): void {
    this.currentProject$
      .subscribe((project: IProject) => {
        const participants: string[] = [
          ...project.participants,
          ...usersUids,
        ];

        this.projectDoc = this.afs.doc(`projects/${project.uid}`);
        this.projectDoc.update({ participants: participants });
      })
  }

  addProject(project: IProjectShort): Promise<DocumentReference> {
     return this.projectsCollection.add(project)
  }

  deleteProject(uid: string): void {
    this.projectDoc = this.afs.doc(`projects/${uid}`)
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