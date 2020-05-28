import { Component, Input, OnInit, Output } from '@angular/core';

import User from 'src/app/shared/interfaces/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit{
  pending: boolean;

  constructor(
    private userService: UserService,
  ) { }

  @Input() user: User;

  ngOnInit() {
    this.pending = this.isUserRegister(this.user);
  }

  handelRemove(uid: string):void {
    this.userService.removeUser(uid);
  }

  private isUserRegister(user: User): boolean {
    if(this.user.name){
      return false;
    }

    return true;
  }
}