import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import User from 'src/app/shared/interfaces/User';
import { UserService } from 'src/app/shared/services/user.service';
import { ageValidator } from '../../../../shared/validators/age.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  nameFormControl: FormControl;
  ageFormControl: FormControl;
  bioFormControl: FormControl;
  emailFormControl: FormControl;
  skypeFormControl: FormControl;

  @Input() currentUser: User;
  @Input() user: User;

  message: string;
  error: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.nameFormControl = new FormControl({
      value: this.user.name ? this.user.name : '',
      disabled: true
    });
    this.ageFormControl = new FormControl(
      { value: this.user.age ? this.user.age : '', disabled: true },
      ageValidator
    );
    this.bioFormControl = new FormControl({
      value: this.user.bio ? this.user.bio : '',
      disabled: true
    });
    this.emailFormControl = new FormControl({
      value: this.user.email ? this.user.email : '',
      disabled: true
    });
    this.skypeFormControl = new FormControl({
      value: this.user.skype ? this.user.skype : '',
      disabled: true
    });

    if (this.currentUser.uid === this.user.uid) {
      this.ageFormControl.enable();
      this.bioFormControl.enable();
      this.skypeFormControl.enable();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.ageFormControl.invalid) {
      return;
    }

    try {
      await this.userService.updateUser(this.currentUser.uid, {
        age: parseInt(this.ageFormControl.value.trim()).toString(),
        bio: this.bioFormControl.value.trim(),
        skype: this.skypeFormControl.value.trim()
      });

      this.message = 'Your profile has been successfully updated';

      setTimeout(() => {
        this.message = null;
      }, 3000);
    } catch (err) {
      this.error = err.message;
    }
  }
}
