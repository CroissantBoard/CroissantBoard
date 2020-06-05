import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/authentification/auth.service';
import User from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  label = 'Sign Up to start';
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.user$
    .subscribe((user) => {
      this.user = user;
      this.label = 'Go to the Board'
    })
  }

  redirect(): void {
    if (this.user) {
      this.router.navigate(['/board/home']);
      return;
    }

    this.router.navigate(['/auth/register']);
  }
}
