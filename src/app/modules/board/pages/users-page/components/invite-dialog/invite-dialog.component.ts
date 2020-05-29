import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/core/authentification/auth.service';

interface IEmail {
  value: string;
  valid: boolean;
}
@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss']
})
export class InviteDialogComponent {
  inviteForm: FormGroup;
  valid = false;
  submitted = false;
  emails: IEmail[] = [];
  notValidEmails: IEmail[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  private workspaceId: string;
  private bdUsers: any[];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<InviteDialogComponent>,
    private usersService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
     // this.authService.user$
    //   .pipe(
    //     switchMap((user) => {
    //       this.workspaceId = user.workspaceId;
    //       return this.userService.getUsers(user.workspaceId);
    //     })
    //   )
    //   .subscribe((users) => {
    //     return this.dbUsers = users;
    //   });

    this.inviteForm = this.buildForm();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = this.inviteForm.value.email;

    if ((value || '').trim()) {
      const email: IEmail = {
        value: this.inviteForm.value.email,
        valid: this.emailControl.valid,
      }

      this.emails.push(email);
    }

    if (input) {
      this.inviteForm.reset();
    }
  }

  remove(email): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }

    this.validateEmails();
  }

  get emailControl() { return this.inviteForm.get('email')}

  handleInvite(): void {
    this.notValidEmails = this.emails.filter((el) => !el.valid );
    this.validateEmails();

    if (this.valid) {
      const usersList = this.emails.map((el) => el.value);

      this.usersService.setUsers(usersList);
      this.dialogRef.close();
    }
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

  private validateEmails():void {
    this.notValidEmails = this.emails.filter((el) => !el.valid );

    if (this.notValidEmails.length) {
      this.valid = false;
      this.submitted = true;

      return;
    }

    this.valid = true;
    this.submitted = true;
  }

  private buildForm() {
    // tslint:disable-next-line: max-line-length
    const pattern = '^[-!#$%&\'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&\'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$'
    return this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(pattern)]]
      }
    )
  }
}
