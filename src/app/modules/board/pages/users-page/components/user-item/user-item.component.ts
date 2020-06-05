import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import User from 'src/app/shared/interfaces/User';
import { DeleteUserComponent } from 'src/app/modules/board/pages/users-page/components/delete-user/delete-user.component';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit{
  pending: boolean;
  isUserAuthor = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  @Input() user: User;
  @Input() currentProjectAuthorId: string;

  ngOnInit() {
    this.pending = this.isUserRegister(this.user);
    this.isUserAuthor = this.checkAuthor(this.user, this.currentProjectAuthorId);
  }

  openDialog(): void {
    this.dialog.open(DeleteUserComponent, {
      width: '500px',
      data: this.user,
    });
  }

  private isUserRegister(user: User): boolean {
    if(this.user.name){
      return false;
    }

    return true;
  }

  private checkAuthor(user: User, authorId: string): boolean {
    return user.uid === authorId;
  }
}
