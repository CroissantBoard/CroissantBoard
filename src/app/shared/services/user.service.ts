import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
      }),
      tap((data) => console.log(data))
    )

    this.users.subscribe();
  }

  getUsers(workspaceId: string): Observable<any> {
    return this.afs
      .collection('users', (ref) => ref.where('workspaceId', '==', workspaceId))
      .valueChanges({ idField: 'id' });
  }
  
  setUsers(users: string[]) {
    const batch = this.afs.firestore.batch();

    users.forEach((user) => {
      const userRef = this.afs.firestore.collection('users').doc();
      batch.set(userRef, { email: user });
    });

    batch.commit()
  }

  removeUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.uid}`)
    this.userDoc.delete()
  }
}