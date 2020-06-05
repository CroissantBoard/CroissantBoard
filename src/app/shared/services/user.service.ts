import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, tap, switchMap, take } from 'rxjs/operators';

import { uniq, without } from 'lodash';

import User from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>
  users$: Observable<User[]>
  userDoc: AngularFirestoreDocument<User>

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users')
    this.users$ = this.usersCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as User
          data.uid = a.payload.doc.id
          return data
        })
      })
    )

    this.users$.subscribe();
  }

  getAllUsers(): Observable<any> {
    return this.users$;
  }

  getUserById(uid: string): Observable<any> {
    this.userDoc = this.afs.doc(`users/${uid}`);
    return from(this.userDoc.get()
      .toPromise().then(doc => doc.data())
    );
  }

  getUsersByProject(workspaceId: string) {
    return this.afs.collection('users', ref => ref.where('projects', 'array-contains', workspaceId))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as User
            data.uid = a.payload.doc.id
            return data
          })
        })
      )
  }

  setUsers(newUserEmails: string[], projectUid: string): Observable<Array<string[]>> {
    return this.users$
      .pipe(
        take(1),
        map((users: User[]): [string[], User[]] => {
          const existingUsers = users
            .filter((user) => newUserEmails.includes(user.email));

          const notRegisterEmails = newUserEmails
            .filter((userEmail: string) => {
              const emails = existingUsers.map(({ email }) => email);
              return !emails.some((email) => email === userEmail);
            });

          return [notRegisterEmails, existingUsers];
        }),
        switchMap(([newUsers, existingUsers]) => {
          const batch = this.afs.firestore.batch();
          const usersIds: string[] = existingUsers.map((user) => user.uid);

          existingUsers.forEach((user) => {
            const userRef = this.afs.firestore.collection('users').doc(user.uid);
            let newProjects: string[] = [];

            if (user.projects) {
              newProjects.push(...user.projects, projectUid);
            } else {
              newProjects.push(projectUid);
            }

            batch.update(userRef, { 'projects': newProjects });
          })

          return from(batch.commit())
            .pipe(
              map(() => [usersIds, newUsers])
            );
        })
      );
  }

  updateUser(uid: string, edit: any): void {
    this.userDoc = this.afs.doc(`users/${uid}`)
    this.userDoc.update(edit)
  }

  addMeetingToUser(meetingId: string, userId: string): void {
    this.afs.doc(`users/${userId}`).get().subscribe(user => {

      const meetings = user.data().meetings && user.data().meetings.length
        ? uniq([
          ...user.data().meetings,
          meetingId,
        ])
        : [meetingId];

      this.afs.doc(`users/${userId}`).update({ meetings });
    });
  }

  deleteMeetingFromUser(meetingId: string, userId: string): void {
    this.afs.doc(`users/${userId}`).get().subscribe(user => {

      const meetings = without(user.data().meetings, meetingId);

      this.afs.doc(`users/${userId}`).update({ meetings });
    });
  }

  setNewProject(user: User, projectRef: string): void {
    let newProject: string[] = [];
    if (user.projects) {
      newProject.push(projectRef, ...user.projects);
    } else {
      newProject.push(projectRef);
    }

    this.userDoc = this.afs.doc(`users/${user.uid}`);
    this.userDoc.update({ projects: newProject });
  }

  removeUser(uid: string): void {
    this.userDoc = this.afs.doc(`users/${uid}`)
    this.userDoc.delete()
  }

  removeUserFromProject(user: User, projectUid: string): void {
    const newProjects: string[] = user.projects.filter((uid) => uid !== projectUid);

    this.userDoc = this.afs.doc(`users/${user.uid}`)
    this.userDoc.update({ projects: newProjects });
  }

  isUsersRegistered(email: string) {
    return this.afs.collection('users', ref => ref.where('projects', '==', email))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as User
            data.uid = a.payload.doc.id
            return data
          })
        })
      )
  }
}
