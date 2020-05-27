import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PeriodComponent } from './components/period/period.component';
import { MomentPipe } from './pipes/moment.pipe';
import { DateService } from './services/date.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  
  declarations: [
    MainComponent, 
    CalendarComponent, 
    ScheduleComponent, 
    PeriodComponent, 
    MomentPipe
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:'', component: MainComponent}
    ])
  ],
  exports: [RouterModule],
  providers: [DateService]
})

export class CalendarPageModule {}
