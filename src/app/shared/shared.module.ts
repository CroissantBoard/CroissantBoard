import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExampleSvgIconComponent } from './icons/example-svg-icon.component';
import { GoogleIconComponent } from './icons/google-icon/google-icon.component';
import { FacebookIconComponent } from './icons/facebook-icon/facebook-icon.component';

@NgModule({
  declarations: [
    ExampleSvgIconComponent,
    GoogleIconComponent,
    FacebookIconComponent,
  ],
  imports: [
    RouterModule,
  ],
  exports: [
    ExampleSvgIconComponent,
    GoogleIconComponent,
    FacebookIconComponent,
  ]
})
export class SharedModule { }
