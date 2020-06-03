import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/core/authentification/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[];
  loading = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    // this.authService.user$
    //   .pipe(
    //     switchMap((user) => {
    //       return this.userService.getUsers(user.workspaceId);
    //     })
    //   )
    //   .subscribe((users) => {
    //     return this.users = users;
    //   });

    this.userService.getAllUsers()
      .subscribe((users) => {
        this.users = users;
        this.loading = false;
      })
  }
}
