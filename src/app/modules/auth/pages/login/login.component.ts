import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/core/authentification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  async onSubmit({ email, password }): Promise<boolean> {
    try {
      return await this.authService.signIn(email, password);
    } catch (err) {
      this.error = err.message;
    }
  }
}
