import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Meeting } from 'src/app/shared/interfaces/meeting';

import formatTime from 'src/app/shared/helpers/formatTime';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})
export class MeetingsListComponent implements OnChanges {

  @Input() meetings: Meeting[] = [];
  @Input() isProjectCreator: boolean = false;

  @Input() isHomePage: boolean = false;

  @Output() deleteMeetingEvent: EventEmitter<string> = new EventEmitter();

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

    if (this.isHomePage || !this.isProjectCreator) this.upcoming = this.upcoming.filter(meeting => meeting.isInit === false);
    if (this.isHomePage) this.upcoming = this.upcoming.splice(0, 6);
  }

  getDate(date): Date {
    return date.toDate();
  }

  formatTime(hour: number): string {
    return formatTime(hour);
  }

  deleteMeeting(meetingId: string): void {
    this.deleteMeetingEvent.emit(meetingId);
  }

}
