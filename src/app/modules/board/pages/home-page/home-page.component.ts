import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { MeetingsService } from 'src/app/shared/services/meetings-service/meetings.service';

import { Meeting } from 'src/app/shared/interfaces/meeting';
import { takeUntil } from 'rxjs/operators';

import formatTime from 'src/app/shared/helpers/formatTime';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  
  private destroy$: Subject<void> = new Subject<void>();

  meetings: Meeting[] = [];

  constructor(private meetingsService: MeetingsService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.meetingsService.getCurrentUserMeetings().pipe(
      takeUntil(this.destroy$)
    ).subscribe(meetings => this.meetings = meetings);
  }

}
