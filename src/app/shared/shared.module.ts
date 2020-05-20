import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [LogoComponent],
  imports: [RouterModule],
  exports: [LogoComponent]
})
export class SharedModule {}
