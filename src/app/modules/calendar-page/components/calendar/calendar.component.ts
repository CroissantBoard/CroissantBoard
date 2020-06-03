import { Component, OnInit, Input } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { DateService } from '../../services/date.service';
import { TaskService } from '../../../../shared/services/task.service'
import { AuthService } from 'src/app/core/authentification/auth.service';
import Task from '../../../../shared/interfaces/Task'
import * as moment from 'moment';

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() tasks: Task[]

  task: Task

  calendar: Week[];

  day: Day[]

  constructor(
    private dateServise: DateService, 
    public taskService: TaskService,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.dateServise.date.subscribe(this.generate.bind(this))

    this.authService.user$
      .pipe(
        switchMap((user) => {
          return this.taskService.getTasks(user.uid);
        })
      )
      .subscribe((tasks) => {

          this.tasks = tasks;

          tasks.filter(task => {

            

              console.log(this.dateServise.date.value.date())

              console.log(moment(task.deadline).date())

              console.log(moment(task.deadline).date() === this.dateServise.date.value.date())

            if (moment(task.deadline).date() == this.dateServise.date.value.date()) {
            
              return this.task = task

            }
          })

          

      });

      // if (this.task.deadline == +(this.dateServise.date.value)) {console.log('d')}

  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1, 'day')

    const calendar = []

    while(date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date')
            const disabled = !now.isSame(value, 'month')
            const selected = now.isSame(value, 'date')

            return {
              value, active, disabled, selected
            }
          })
      })
    }

    this.calendar = calendar
  }

  select(day: moment.Moment) {
    this.dateServise.switchDate(day)
  }

  viewTask(task: Task) {
    // return this.taskService.getOneTask(task);
    
  }

}
