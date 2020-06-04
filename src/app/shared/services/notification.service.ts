import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor (
    private _snackBar: MatSnackBar,
    ) {  }

openSnackBar(message: string, action?: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    config.data = message;
    // config.horizontalPosition = 'start',
    config.verticalPosition = 'bottom',

    this._snackBar.open(message, action, {
      ...config
    });
  }
}
