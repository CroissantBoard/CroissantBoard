import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { ExampleSvgIconComponent } from './icons/example-svg-icon.component';
import { GoogleIconComponent } from './icons/google-icon/google-icon.component';
import { FacebookIconComponent } from './icons/facebook-icon/facebook-icon.component';
import { CroissantIconComponent } from "./icons/croissant-icon/croissant-icon.component";
import { HotDrinkIconComponent } from "./icons/hot-drink/hot-drink-icon.component";
import { LineSeparatorComponent } from "./icons/line-separator/line-separator.component";
import { AvatarComponent } from './components/avatar/avatar.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ExampleSvgIconComponent,
    GoogleIconComponent,
    FacebookIconComponent,
    CroissantIconComponent,
    HotDrinkIconComponent,
    LineSeparatorComponent,
    AvatarComponent,
    ClickOutsideDirective,
    UserMenuComponent,
    NotificationComponent,
  ],
  imports: [
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    ExampleSvgIconComponent,
    GoogleIconComponent,
    FacebookIconComponent,
    CroissantIconComponent,
    HotDrinkIconComponent,
    LineSeparatorComponent,
    CommonModule,
    AvatarComponent,
    ClickOutsideDirective,
    UserMenuComponent,
    NotificationComponent,

    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class SharedModule { }
