import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InviteDialogComponent } from './components/invite-dialog/invite-dialog.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    console.log('dialog')
    this.dialog.open(InviteDialogComponent, {
      width: '600px',
    });
  }

}
