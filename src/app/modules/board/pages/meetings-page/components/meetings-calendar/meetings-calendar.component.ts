import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import getToday from 'src/app/shared/helpers/getToday';

@Component({
  selector: 'app-meetings-calendar',
  templateUrl: './meetings-calendar.component.html',
  styleUrls: ['./meetings-calendar.component.scss']
})
export class MeetingsCalendarComponent implements OnInit {
  
  @Input() filter: Function = () => true;
  @Input() minDate: Date = getToday();
  @Input() meetingDay: Date = getToday();

  @Output() dayChangeEvent: EventEmitter<Date> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  onDayChange(): void {
    this.dayChangeEvent.emit(this.meetingDay);
  }

  onReset(): void {
    this.meetingDay = getToday();

    this.onDayChange();
  }

}
