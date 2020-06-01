import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgAisModule, NgAisInstantSearch } from 'angular-instantsearch';

import { BoardRoutingModule } from './board-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CDKModule } from 'src/app/shared/modules/cdk.module';

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

import { TimelineComponent } from './pages/meetings-page/components/timeline/timeline.component';
import { TimelineBarComponent } from './pages/meetings-page/components/timeline-bar/timeline-bar.component';
import { TimelineMainContainerComponent } from './pages/meetings-page/components/timeline-main-container/timeline-main-container.component';
import { TimelineGhostContainerComponent } from './pages/meetings-page/components/timeline-ghost-container/timeline-ghost-container.component';
import { TimelineHandleComponent } from './pages/meetings-page/components/timeline-handle/timeline-handle.component';
import { HourPickerComponent } from './pages/meetings-page/components/hour-picker/hour-picker.component';


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
  TimelineComponent,
  TimelineBarComponent,
  TimelineMainContainerComponent,
  TimelineGhostContainerComponent,
  TimelineHandleComponent,
  HourPickerComponent,
],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BoardRoutingModule,
    CommonModule,
    MaterialModule,
    CDKModule,
    FormsModule,
    ReactiveFormsModule,
    NgAisModule
  ],
  providers: [NgAisInstantSearch]
})
export class BoardModule { }
