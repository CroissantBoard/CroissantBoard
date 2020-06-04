import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTabsModule,
  MatSelectModule,
  MatDialogModule,
  MatChipsModule,
  MatDividerModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatButtonToggleModule,
  MatNativeDateModule,
  MatStepperModule,
  MatMenuModule,
  MatTooltipModule,
  MatExpansionModule,
  MatRippleModule,
  MatCardModule,
  MatSnackBarModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...MaterialComponents,
  ],
  exports: [
    ...MaterialComponents,
  ]
})
export class MaterialModule { }
