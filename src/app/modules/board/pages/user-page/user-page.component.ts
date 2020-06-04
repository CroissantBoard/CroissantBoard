import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import User from 'src/app/shared/interfaces/User';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { ageValidator } from '../../../../shared/validators/age.validator';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  nameFormControl: FormControl;
  ageFormControl: FormControl;
  bioFormControl: FormControl;
  emailFormControl: FormControl;
  skypeFormControl: FormControl;

  currentUser: User;
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.nameFormControl = new FormControl({ value: '', disabled: true });
    this.ageFormControl = new FormControl(
      { value: '', disabled: true },
      ageValidator
    );
    this.bioFormControl = new FormControl({ value: '', disabled: true });
    this.emailFormControl = new FormControl({ value: '', disabled: true });
    this.skypeFormControl = new FormControl({ value: '', disabled: true });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;

      if (this.user && this.user.uid === user.uid) {
        this.ageFormControl.enable();
      }
      if (this.user && this.user.uid === user.uid) {
        this.bioFormControl.enable();
      }
      if (this.user && this.user.uid === user.uid) {
        this.skypeFormControl.enable();
      }
    });

    this.activatedRoute.params
      .pipe(switchMap(params => this.userService.getUser(params['id'])))
      .subscribe(user => {
        this.user = user;

        this.nameFormControl.setValue(user.name ? user.name : '');
        this.ageFormControl.setValue(user.age ? user.age : '');
        this.bioFormControl.setValue(user.bio ? user.bio : '');
        this.emailFormControl.setValue(user.email ? user.email : '');
        this.skypeFormControl.setValue(user.skype ? user.skype : '');

        if (this.currentUser && this.currentUser.uid === user.uid) {
          this.ageFormControl.enable();
        }
        if (this.currentUser && this.currentUser.uid === user.uid) {
          this.bioFormControl.enable();
        }
        if (this.currentUser && this.currentUser.uid === user.uid) {
          this.skypeFormControl.enable();
        }
      });
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
