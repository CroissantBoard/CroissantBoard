import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { MeetingsService } from 'src/app/shared/services/meetings-service/meetings.service';

import { Meeting } from 'src/app/shared/interfaces/meeting';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/core/authentification/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  meetings: Meeting[] = [];

  constructor(
    private auth: AuthService,
    private meetingsService: MeetingsService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      this.meetingsService.getAllMeetingsByUser(user.uid).pipe(
        takeUntil(this.destroy$)
      ).subscribe(meetings => this.meetings = meetings);
    });
  }

}
