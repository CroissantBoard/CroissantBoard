import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardPageComponent } from './board-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';
import { TaskPageComponent } from './pages/tasks-page/task-page/task-page.component';

export const routes: Routes = [
  {
    path: '',
    component: BoardPageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'tasks', component: TasksPageComponent },
      { path: 'tasks/:id', component: TaskPageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'meetings', component: MeetingsPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule {}
