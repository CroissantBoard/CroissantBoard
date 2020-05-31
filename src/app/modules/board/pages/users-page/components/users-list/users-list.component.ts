import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/shared/services/user.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[];
  loading = true;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.projectService.currentProject$
      .subscribe((project) => {
        this.userService.getUsersByProject(project.uid)
          .subscribe((users) => {
            this.users = users;
            this.loading = false;
          })
      })

      //show all users registered to the app
    // this.userService.getAllUsers()
    //   .subscribe((users) => {
    //     this.users = users;
    //     console.log('all', users);
    //     this.loading = false;
    //   })
  }

}
