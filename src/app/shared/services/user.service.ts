import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import User from '../interfaces/User';
import { IProjectShort } from '../interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>
  users: Observable<User[]>
  userDoc: AngularFirestoreDocument<User>

  constructor(public afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users')
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as User
          data.uid = a.payload.doc.id
          return data
        })
      })
    )

    this.users.subscribe();
  }

  getAllUsers(): Observable<any> {
    return this.users;
  }

  getUsers(workspaceId: string): Observable<any> {
    return this.afs
      .collection('users', (ref) => ref.where('workspaceId', '==', workspaceId))
      .valueChanges({ idField: 'id' });
  }
  
  setUsers(users: string[]): void {
    const batch = this.afs.firestore.batch();

    users.forEach((user) => {
      const userRef = this.afs.firestore.collection('users').doc();
      batch.set(userRef, { email: user });
    });

    batch.commit()
  }

  updateUser(uid: string, edit: any): void {
    this.userDoc = this.afs.doc(`users/${uid}`)
    this.userDoc.update(edit)
  }

  setNewProject(user: User, project: IProjectShort): void {
    if(user.projects) {
      user.projects.push(project);
    } else {
      user.projects = [ project ];
    }

    this.userDoc = this.afs.doc(`users/${user.uid}`);
    this.userDoc.update({ projects: user.projects});
  }

  removeUser(uid: string): void {
    this.userDoc = this.afs.doc(`users/${uid}`)
    this.userDoc.delete()
  }
}