import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/services/user.service';

import User from 'src/app/shared/interfaces/User';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-users-select',
  templateUrl: './users-select.component.html',
  styleUrls: ['./users-select.component.scss']
})
export class UsersSelectComponent implements OnChanges {
  
  @Input() projectId: string;
  @Input() currentUserId: string;

  @Output() selectedUserIdsEvent: EventEmitter<string[]> = new EventEmitter<string[]>();

  users: User[] = [];
  usersControl: FormControl = new FormControl([], [
    Validators.required
  ]);

  constructor(private userService: UserService) { }

  ngOnChanges(): void {
    if (this.projectId) {
      this.userService.getUsersByProject(this.projectId).pipe(
        take(1)
      ).subscribe(users => this.users = users);
    }

    if (this.currentUserId && !this.usersControl.value.length) this.usersControl.setValue([this.currentUserId]);
    console.log(this.usersControl.value)
  }

  onUserSelect(): void {
    this.selectedUserIdsEvent.emit(this.usersControl.value);
  }

}
