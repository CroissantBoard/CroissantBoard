import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [AuthRoutingModule, ReactiveFormsModule]
})
export class AuthModule {}
