import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, tap, switchMap, take } from 'rxjs/operators';

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

  getUsersByProject(workspaceId: string) {
    return this.afs.collection('users', ref => ref.where('projects', 'array-contains', workspaceId ))
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

  setUsers(newUserEmails: string[], projectUid: string): Observable<string[]> {
    return this.users$
      .pipe(
        take(1),
        map((users: User[]) => {
          const existingUsers = users
            .filter((user) => newUserEmails.includes(user.email));

          const uniqueEmails = newUserEmails
            .filter((userEmail: string) => {
              const emails = existingUsers.map(({ email }) => email);
              return !emails.some((email) => email === userEmail);
            });

          return [ uniqueEmails, existingUsers];
        }),
        switchMap(([newUsers, existingUsers]) => {
          const batch = this.afs.firestore.batch();
          const usersIds: string[] = [];
          
          newUsers.forEach((user) => {
            const userRef = this.afs.firestore.collection('users').doc();
            batch.set(userRef, { email: user, projects: [projectUid] });
            usersIds.push(userRef.id);
          });

          existingUsers.forEach((user) => {
            const userRef = this.afs.firestore.collection('users').doc(user.uid);
            let newProject: string[] = [];

            if (user.projects) {
              newProject.push(...user.projects, projectUid);
            } else {
              newProject.push(projectUid);
            }

            batch.update(userRef, {'projects': newProject});
          })

          return from(batch.commit())
            .pipe(
              map(() => [ ...usersIds, ...[] ])
            );
        })
      );
  }

  updateUser(uid: string, edit: any): void {
    this.userDoc = this.afs.doc(`users/${uid}`)
    this.userDoc.update(edit)
  }

  setNewProject(user: User, projectRef: string): void {
    let newProject: string[] = [];
    if(user.projects) {
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
}