import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';

import { MaterialModule } from '../../shared/modules/material.module';
import { BoardRoutingModule } from './board-routing.module';
import { FormsModule } from '@angular/forms';

import { BoardPageComponent } from './board-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { SearchComponent } from './components/search/search.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

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
    SearchBoxComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    BoardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgAisModule
  ]
})
export class BoardModule {}
