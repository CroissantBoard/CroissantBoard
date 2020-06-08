import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { switchMap } from 'rxjs/operators';
import Task from 'src/app/shared/interfaces/Task';
import * as moment from 'moment';

interface Day {
 value: moment.Moment
 active: boolean
 disabled: boolean
 selected: boolean
}

@Component({
 selector: 'app-schedule',
 templateUrl: './schedule.component.html',
 styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

 public tasks: Task[] = []

 public day: Day[]

 constructor(
   public dateService: DateService, 
   public taskService: TaskService,
   private authService: AuthService
   ) {}

 ngOnInit() {
  this.dateService.date.subscribe(this.getTodayTasks.bind(this))

   this.authService.user$
     .pipe(
       switchMap((user) => {
         return this.taskService.getTasks(user.uid);
       })
     )
     .subscribe((tasks) => {
       this.tasks = tasks
     })
 } 

 getTodayTasks(date) {
  return this.tasks.filter(task => moment(task.deadline).isSame(this.dateService.date.value, 'day') && !task.completed)
}
 
}