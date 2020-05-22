import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../shared/modules/material.module';
import { BoardRoutingModule } from './board-routing.module';
import { FormsModule } from '@angular/forms';

import { BoardPageComponent } from './board-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';
import { TaskComponent } from './pages/tasks-page/components/task/task.component';
import { TaskAddComponent } from './pages/tasks-page/components/task-add/task-add.component';
import { TaskListComponent } from './pages/tasks-page/components/task-list/task-list.component';
import { TaskEditComponent } from './pages/tasks-page/components/task-edit/task-edit.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { SearchComponent } from './components/board-header/search/search.component';

@NgModule({
  declarations: [
  BoardPageComponent,
  TasksPageComponent,
  HomePageComponent,
  UsersPageComponent,
  MeetingsPageComponent,
  TaskComponent,
  TaskAddComponent,
  TaskListComponent,
  TaskEditComponent,
  SidebarComponent,
  BoardHeaderComponent,
  SearchComponent,
],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BoardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BoardModule {}
