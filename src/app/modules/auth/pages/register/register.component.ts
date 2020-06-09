import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/authentification/auth.service';
import { fullNameValidator } from '../../../../shared/validators/name.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nameFormControl: FormControl;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  confirmPasswordFormControl: FormControl;
  error: string;

  constructor(private router: Router, private authService: AuthService) {
    this.nameFormControl = new FormControl('', [
      Validators.required,
      fullNameValidator
    ]);
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
    this.confirmPasswordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  async onSubmit(): Promise<boolean> {
    if (
      this.nameFormControl.invalid ||
      this.emailFormControl.invalid ||
      this.passwordFormControl.invalid ||
      this.confirmPasswordFormControl.invalid
    ) {
      return;
    }

    if (
      this.passwordFormControl.value === this.confirmPasswordFormControl.value
    ) {
      try {
        await this.authService.signUp(
          this.nameFormControl.value.trim(),
          this.emailFormControl.value.trim(),
          this.passwordFormControl.value
        );

        return this.router.navigate(['/board/home']);
      } catch (err) {
        console.log(err);
        if (err.code === 'auth/email-already-in-use') {
          this.emailFormControl.setErrors({ 'inUse': true });
        }
      }
    } else {
      this.confirmPasswordFormControl.setErrors({ 'matchPassword': true });
    }
  }
}
