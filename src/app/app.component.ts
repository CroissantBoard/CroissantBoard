import { Component } from '@angular/core';
import { AuthService } from './core/authentification/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CroissantBoard';
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.signOut();
  }
}
