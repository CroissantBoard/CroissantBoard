import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
 {
    path: '',
    loadChildren: () =>
        import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'board',
    loadChildren: () =>
      import('./modules/board/board.module').then(m => m.BoardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./modules/calendar-page/calendar-page.module').then(m => m.CalendarPageModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
