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

  onSubmit(): void {
    try {
      this.userService.updateUser(this.currentUser.uid, {
        age: this.ageFormControl.value.trim(),
        bio: this.bioFormControl.value.trim(),
        skype: this.skypeFormControl.value.trim()
      });
    } catch (err) {
      console.log(err);
    }
  }
}
