import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import User from '../../shared/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user: firebase.User) => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signUp(email: string, password: string): Promise<boolean> {
    const createdUser: auth.UserCredential = await this.fireAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (createdUser) {
      const { uid, email }: firebase.User = createdUser.user;

      await this.firestore.collection('users').doc(uid).set({ uid, email });

      return this.router.navigate(['/']);
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    await this.fireAuth.signInWithEmailAndPassword(email, password);

    return this.router.navigate(['/']);
  }

  async signOut(): Promise<boolean> {
    await this.fireAuth.signOut();

    return this.router.navigate(['/auth/login']);
  }
}
