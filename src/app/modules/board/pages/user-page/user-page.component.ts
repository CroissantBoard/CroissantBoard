import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import User from 'src/app/shared/interfaces/User';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { ageValidator } from '../../../../shared/validators/age.validator';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  currentUser: User;
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });

    this.activatedRoute.params
      .pipe(switchMap(params => this.userService.getUser(params['id'])))
      .subscribe(user => {
        this.user = user;
      });
  }
}
