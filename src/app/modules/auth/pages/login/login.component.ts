import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/authentification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailFormControl: FormControl;
  passwordFormControl: FormControl;

  constructor(private router: Router, public authService: AuthService) {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.passwordFormControl = new FormControl('');
  }

  async onSubmit(): Promise<boolean> {
    try {
      await this.authService.signInWithEmail(
        this.emailFormControl.value,
        this.passwordFormControl.value
      );

      return this.router.navigate(['/board/home']);
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/user-not-found') {
        this.emailFormControl.setErrors({ 'notFound': true });
      }
      if (err.code === 'auth/wrong-password') {
        this.passwordFormControl.setErrors({ 'wrongPassword': true });
      }
    }
  }

  async signInWithGoogle(): Promise<boolean> {
    try {
      await this.authService.signInWithGoogle();

      return this.router.navigate(['/board/home']);
    } catch (err) {
      console.log(err);
    }
  }

  async signInWithFacebook(): Promise<boolean> {
    try {
      await this.authService.signInWithFacebook();

      return this.router.navigate(['/board/home']);
    } catch (err) {
      console.log(err);
    }
  }
}
