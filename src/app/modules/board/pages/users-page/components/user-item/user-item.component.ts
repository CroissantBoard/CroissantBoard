import { Component, Input, OnInit, Output } from '@angular/core';

import User from 'src/app/shared/interfaces/User';
import { UserService } from 'src/app/shared/services/user.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { IProject } from 'src/app/shared/interfaces/Project';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit{
  pending: boolean;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
  ) { }

  @Input() user: User;

  ngOnInit() {
    this.pending = this.isUserRegister(this.user);
  }

  handelRemove(user: User):void {
    this.projectService.currentProject$
      .subscribe((project: IProject) => {
        this.userService.removeUserFromProject(user, project.uid);
      });

    this.projectService.removeParticipant(user.uid);
  }

  private isUserRegister(user: User): boolean {
    if(this.user.name){
      return false;
    }

    return true;
  }
}
