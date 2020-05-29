import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgAisModule, NgAisInstantSearch } from 'angular-instantsearch';
import { FormsModule } from '@angular/forms';


import { MaterialModule } from '../../shared/modules/material.module';
import { BoardRoutingModule } from './board-routing.module';

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
import { SearchComponent } from './components/search/search.component';
import { UsersListComponent } from './pages/users-page/components/users-list/users-list.component';
import { UserItemComponent } from './pages/users-page/components/user-item/user-item.component';
import { InviteDialogComponent } from './pages/users-page/components/invite-dialog/invite-dialog.component';
import { TaskFilterComponent } from './pages/tasks-page/components/task-filter/task-filter.component';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';
import { ProjectItemComponent } from './pages/home-page/components/project-item/project-item.component';
import { ProjectsListComponent } from './pages/home-page/components/projects-list/projects-list.component';
import { ProjectAddComponent } from './pages/home-page/components/project-add/project-add.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
    UsersListComponent,
    UserItemComponent,
    InviteDialogComponent,
    TaskFilterComponent,
    SortPipe,
    ProjectItemComponent,
    ProjectsListComponent,
    ProjectAddComponent,
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BoardRoutingModule,
    CommonModule,
    NgAisModule,
    SharedModule,
  ],
  providers: [NgAisInstantSearch]
})
export class BoardModule {}
