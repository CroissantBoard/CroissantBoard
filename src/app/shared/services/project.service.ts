import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProject, IProjectShort } from '../interfaces/Project';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsCollection: AngularFirestoreCollection<IProject>
  projects: Observable<IProject[]>
  projectDoc: AngularFirestoreDocument<IProject>

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
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

  setUsers(users: string[]) {
    const batch = this.afs.firestore.batch();

    users.forEach((user) => {
      const projectRef = this.afs.firestore.collection('projects').doc();
      batch.set(projectRef, { email: user });
    });

    batch.commit()
  }

  addProject(user, project: IProjectShort) {
    const newProject = {
      ...project,
      participants: [
        user.uid,
      ]
    }

    this.projectsCollection.add(newProject).then(docRef => {
      const ref = (docRef) ? (docRef).id : null;

      if (ref) {
        const dbProject = {
          ...project,
          uid: (docRef).id,
        } 

        this.userService.setNewProject(user, dbProject)
      }
    })
  }

  deleteProject(uid: string) {
    this.projectDoc = this.afs.doc(`projects/${uid}`)
    this.projectDoc.delete()
  }
}