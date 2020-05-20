import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../shared/modules/material.module';
import { BoardRoutingModule } from './board-routing.module';

import { BoardPageComponent } from './board-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';

@NgModule({
  declarations: [
  BoardPageComponent,
  TasksPageComponent,
  HomePageComponent,
  UsersPageComponent,
  MeetingsPageComponent,
],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    BoardRoutingModule,
  ]
})
export class BoardModule {}
