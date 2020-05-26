import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ExampleSvgIconComponent} from './icons/example-svg-icon.component';
import { GoogleIconComponent } from './icons/google-icon/google-icon.component';
import { FacebookIconComponent } from './icons/facebook-icon/facebook-icon.component';
import {CroissantIconComponent} from "./icons/croissant-icon/croissant-icon.component";
import {HotDrinkIconComponent} from "./icons/hot-drink/hot-drink-icon.component";
import {LineSeparatorComponent} from "./icons/line-separator/line-separator.component";

@NgModule({
  declarations: [
      ExampleSvgIconComponent,
      GoogleIconComponent,
      FacebookIconComponent,
      CroissantIconComponent,
      HotDrinkIconComponent,
      LineSeparatorComponent
  ],
  imports: [RouterModule],
  exports: [
      ExampleSvgIconComponent,
      GoogleIconComponent,
      FacebookIconComponent,
      CroissantIconComponent,
      HotDrinkIconComponent,
      LineSeparatorComponent
  ]
})
export class SharedModule {}
