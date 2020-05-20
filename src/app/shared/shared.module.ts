import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ExampleSvgIconComponent} from './icons/example-svg-icon.component';

@NgModule({
  declarations: [ExampleSvgIconComponent],
  imports: [RouterModule],
  exports: [ExampleSvgIconComponent]
})
export class SharedModule {}
