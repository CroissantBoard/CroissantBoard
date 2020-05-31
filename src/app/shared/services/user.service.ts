import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import User from '../interfaces/User';

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

  getUserById(uid: string): Observable<any> {
    this.userDoc = this.afs.doc(`users/${uid}`);
    return from(this.userDoc.get()
      .toPromise().then(doc => doc.data())
    );
  }

  getUsersByProjectId(projectId: string): Observable<any> {
    const projectRef = this.afs
      .doc(`projects/${projectId}`)

    const users = projectRef.get().toPromise()
      .then(doc => doc.data().participants);

    return from(users);
  }
  
  setUsers(users: string[]) {
    const batch = this.afs.firestore.batch();

    users.forEach((user) => {
      const userRef = this.afs.firestore.collection('users').doc();
      batch.set(userRef, { email: user });
    });

    batch.commit()
  }

  removeUser(uid: string) {
    this.userDoc = this.afs.doc(`users/${uid}`)
    this.userDoc.delete()
  }
}
