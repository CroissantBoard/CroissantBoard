import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import User from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Input() user: User | null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  redirectHome(): void {
    this.router.navigate(['/']);
  }

  redirectTeam(): void {
    this.router.navigate(['/team']);
  }

  redirectStart(): void {
    this.router.navigate(['/start']);
  }

  redirectRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  redirectLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
