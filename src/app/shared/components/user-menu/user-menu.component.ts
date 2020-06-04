import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import User from 'src/app/shared/interfaces/User';
import { AuthService } from 'src/app/core/authentification/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() user: User | null;
  userShortName: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userShortName = this.getTitle(this.user.name);
  }

  redirectHome(): void {
    this.router.navigate(['/board/home']);
  }

  redirectProfile(): void {
    // TODO replace with link to user page
    this.router.navigate([`/board/profile/{user.uid}`]);
  }

  logout(): void {
    this.authService.signOut();
  }

  private getTitle(val: string): string {
    const valueArr = val.split(' ');

    if (valueArr.length > 1) {
      return valueArr[0][0].toUpperCase() + valueArr[1][0].toUpperCase();
    }

    return valueArr[0][0].toUpperCase()
  }
}
