import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import User from 'src/app/shared/interfaces/User';
import { UserService } from 'src/app/shared/services/user.service';
import { ageValidator } from '../../../../shared/validators/age.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnChanges {
  nameFormControl: FormControl;
  ageFormControl: FormControl;
  bioFormControl: FormControl;
  emailFormControl: FormControl;
  skypeFormControl: FormControl;

  @Input() currentUser: User;
  @Input() user: User;

  message: string;
  error: string;

  constructor(private userService: UserService) {
    this.nameFormControl = new FormControl({
      value: '',
      disabled: true
    });
    this.ageFormControl = new FormControl(
      { value: '', disabled: true },
      ageValidator
    );
    this.bioFormControl = new FormControl({
      value: '',
      disabled: true
    });
    this.emailFormControl = new FormControl({
      value: '',
      disabled: true
    });
    this.skypeFormControl = new FormControl({
      value: '',
      disabled: true
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user) {
      const user: User = changes.user.currentValue;

      this.nameFormControl.setValue(user.name ? user.name : ' ');
      this.ageFormControl.setValue(user.age ? user.age : ' ');
      this.bioFormControl.setValue(user.bio ? user.bio : ' ');
      this.emailFormControl.setValue(user.email ? user.email : ' ');
      this.skypeFormControl.setValue(user.skype ? user.skype : ' ');

      if (this.currentUser.uid === user.uid) {
        this.ageFormControl.enable();
        this.bioFormControl.enable();
        this.skypeFormControl.enable();
      } else {
        this.ageFormControl.disable();
        this.bioFormControl.disable();
        this.skypeFormControl.disable();
      }
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
