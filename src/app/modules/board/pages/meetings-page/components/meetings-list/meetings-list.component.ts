import { Component, OnChanges, Input } from '@angular/core';

import { Meeting } from 'src/app/shared/interfaces/meeting';
import formatTime from 'src/app/shared/helpers/formatTime';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})
export class MeetingsListComponent implements OnChanges {

  @Input() meetings: Meeting[] = [];

  finished: Meeting[] = [];
  upcoming: Meeting[] = [];

  constructor() { }

  ngOnChanges(): void {
    this.finished = [];
    this.upcoming = [];

    this.meetings.forEach(meeting => {
      if (meeting.isFinished) {
        this.finished.push(meeting);
      } else {
        this.upcoming.push(meeting);
      }
    });
  }

  getDate(date): Date {
    return date.toDate();
  }

  formatTime(hour: number): string {
    return formatTime(hour);
  }

}
