import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CDKModule } from 'src/app/shared/modules/cdk.module';

import { BoardPageComponent } from './board-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { SearchComponent } from './components/board-header/search/search.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineBarComponent } from './components/timeline-bar/timeline-bar.component';

@NgModule({
  declarations: [
    BoardPageComponent,
    TasksPageComponent,
    HomePageComponent,
    UsersPageComponent,
    MeetingsPageComponent,
    SidebarComponent,
    BoardHeaderComponent,
    SearchComponent,
    TimelineComponent,
    TimelineBarComponent,
  ],
  imports: [
    BoardRoutingModule,
    CommonModule,
    MaterialModule,
    CDKModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BoardModule { }
