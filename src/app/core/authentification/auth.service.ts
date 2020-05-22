import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
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
      switchMap((firebaseUser: firebase.User) => {
        if (firebaseUser) {
          return this.firestore
            .doc<User>(`users/${firebaseUser.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signUp(name: string, email: string, password: string): Promise<any> {
    const userCredential: auth.UserCredential = await this.fireAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (userCredential) {
      await userCredential.user.updateProfile({ displayName: name });

      this.updateUserData(userCredential.user);
    }
  }

  async signInWithEmail(email: string, password: string): Promise<any> {
    return await this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  async signInWithGoogle(): Promise<any> {
    const provider: auth.AuthProvider = new auth.GoogleAuthProvider();
    const userCredential: auth.UserCredential = await this.fireAuth.signInWithPopup(
      provider
    );

    this.updateUserData(userCredential.user);
  }

  async signInWithFacebook(): Promise<any> {
    const provider: auth.AuthProvider = new auth.FacebookAuthProvider();
    const userCredential: auth.UserCredential = await this.fireAuth.signInWithPopup(
      provider
    );

    this.updateUserData(userCredential.user);
  }

  async signOut(): Promise<boolean> {
    await this.fireAuth.signOut();

    return this.router.navigate(['/auth/login']);
  }

  private updateUserData(firebaseUser: firebase.User): void {
    const userData: User = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email
    };

    this.firestore
      .collection('users')
      .doc(firebaseUser.uid)
      .set(userData, { merge: true });
  }
}
