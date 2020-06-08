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

import { ProjectItemComponent } from './pages/home-page/components/project-item/project-item.component';
import { ProjectsListComponent } from './pages/home-page/components/projects-list/projects-list.component';
import { ProjectAddComponent } from './pages/home-page/components/project-add/project-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectSelectComponent } from './components/project-select/project-select.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ProfileComponent } from './components/profile/profile.component';

import { TimelineComponent } from './pages/meetings-page/components/timeline/timeline.component';
import { TimelineBarComponent } from './pages/meetings-page/components/timeline-bar/timeline-bar.component';
import { TimelineMainContainerComponent } from './pages/meetings-page/components/timeline-main-container/timeline-main-container.component';
import { TimelineGhostContainerComponent } from './pages/meetings-page/components/timeline-ghost-container/timeline-ghost-container.component';
import { TimelineHandleComponent } from './pages/meetings-page/components/timeline-handle/timeline-handle.component';
import { HourPickerComponent } from './pages/meetings-page/components/hour-picker/hour-picker.component';
import { BackgroundRulerComponent } from './pages/meetings-page/components/background-ruler/background-ruler.component';
import { MeetingsListComponent } from './components/meetings-list/meetings-list.component';
import { MeetingsCalendarComponent } from './pages/meetings-page/components/meetings-calendar/meetings-calendar.component';
import { UsersSelectComponent } from './pages/meetings-page/components/users-select/users-select.component';
import { SortUpcomingMeetingsPipe } from 'src/app/shared/pipes/sort-upcoming-meetings-pipe/sort-upcoming-meetings.pipe';

import { ProjectEditComponent } from './pages/home-page/components/project-edit/project-edit.component';
import { TaskPageComponent } from './pages/tasks-page/task-page/task-page.component';
import { DeleteProjectComponent } from './pages/home-page/components/delete-project/delete-project.component';
import { DeleteUserComponent } from './pages/users-page/components/delete-user/delete-user.component';

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
    ProjectSelectComponent,
    UserPageComponent,
    ProfileComponent,
    TimelineComponent,
    TimelineBarComponent,
    TimelineMainContainerComponent,
    TimelineGhostContainerComponent,
    TimelineHandleComponent,
    HourPickerComponent,
    BackgroundRulerComponent,
    MeetingsListComponent,
    MeetingsCalendarComponent,
    ProjectEditComponent,
    TaskPageComponent,
    DeleteProjectComponent,
    DeleteUserComponent,
    SortUpcomingMeetingsPipe,
    UsersSelectComponent,
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
    NgAisModule,
    SharedModule,
  ],
  providers: [NgAisInstantSearch]
})
export class BoardModule { }
