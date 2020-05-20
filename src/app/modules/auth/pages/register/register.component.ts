import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/core/authentification/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  async onSubmit({ email, password, confirmPassword }): Promise<boolean> {
    if (password === confirmPassword) {
      try {
        await this.authService.signUp(email, password);

        return this.router.navigate(['/todos']);
      } catch (err) {
        this.error = err.message;
      }
    } else {
      this.error = 'Passwords does not match';
    }
  }
}
