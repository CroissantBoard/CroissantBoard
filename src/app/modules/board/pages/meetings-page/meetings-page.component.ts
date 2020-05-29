import { Component, OnInit, OnDestroy } from '@angular/core';

import { intersection, union, without } from 'lodash';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/shared/services/user.service';
import { MeetingsService } from 'src/app/shared/services/meetings-service/meetings.service';

import { TimelineObject } from 'src/app/shared/interfaces/timeline/timeline-object';
import { Meeting } from 'src/app/shared/interfaces/meeting';
import User from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  timelineRuler = new Array(24).fill(null);

  timelineBarId: string = 'addingItemsList';
  addingDropListIdPrefix: string = 'addingDropListId_';

  users: User[] = [];
  meeting: Meeting;

  meetingDate: Date;

  bestMeetingHours: number[] = [];
  possibleMeetingHours: number[] = [];

  updateIntervalId: any;

  constructor(
    private meetingsService: MeetingsService,
    private userService: UserService
  ) { }

  ngOnDestroy(): void {
    clearInterval(this.updateIntervalId);
    
    this.updateMeeting();

    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.meetingDate = new Date();

    this.meetingsService.getAllMeetings().pipe(
      takeUntil(this.destroy$)
    ).subscribe(meetings => {
      this.meeting = meetings[0];

      this.setBestMeetingHours();
    })

    this.userService.getAllUsers().pipe(
      takeUntil(this.destroy$)
    ).subscribe(users => this.users = users);

    this.updateIntervalId = setInterval(() => {
      this.updateMeeting();
    }, 10000);
  }

  updateMeeting() {
    this.meetingsService.updateMeeting(this.meeting);
  }

  onChangedTimelineEvent($event: TimelineObject): void {
    this.meeting.timelines.forEach(line => {
      if (line.timelineId === $event.timelineId) {
        line.data = $event.data;
        return;
      }
    });

    this.setBestMeetingHours();
  }

  setBestMeetingHours(): void {
    let isAllUsersfree = true;
    this.meeting.timelines.forEach(line => {
      const hasFree = line.data.filter(cont => cont.status === 'free');

      if (!hasFree.length) {
        isAllUsersfree = false;
        return;
      }
    })

    const [
      freeHours, allFreeHours, busyHours, undesirableHours, notGivenHours
    ] = this.sortHoursInDifferentArrays();

    this.bestMeetingHours = this.calculateBestMeetingHours(
      freeHours, busyHours, undesirableHours, notGivenHours
    );

    this.possibleMeetingHours = this.calculatePossibleMeetingHours(
      freeHours, allFreeHours, busyHours, undesirableHours, notGivenHours, isAllUsersfree
    );
  }

  sortHoursInDifferentArrays(): Array<number[]> {
    let free: number[] = [],
      allFree: number[] = [];

    let busy: number[] = [],
      undesirable: number[] = [],
      notGiven: number[] = [];

    this.meeting.timelines.forEach(line => {
      let lineNotGivenHours: number[] = this.generateRange(0, 23);

      line.data.forEach(cont => {
        const hours = this.generateRange(cont.indexes[0], cont.indexes[1]);

        lineNotGivenHours = without(lineNotGivenHours, ...hours);

        switch (cont.status) {
          case 'free':
            allFree = union(allFree, hours);

            if (!free.length) {
              free = hours;
            } else {
              free = intersection(free, hours);
            }
            break;

          case 'busy':
            busy = union(busy, hours);
            break;

          case 'undesirable':
            undesirable = union(undesirable, hours);
            break;

          default:
            break;
        }
      })

      notGiven = union(notGiven, lineNotGivenHours);
    });

    return [free, allFree, busy, undesirable, notGiven];
  }

  calculateBestMeetingHours(
    free: number[], busy: number[], undesirable: number[], notGiven: number[]
  ): number[] {
    const hours = without(free, ...busy, ...undesirable, ...notGiven);

    return hours.length ? intersection(hours).sort((a, b) => a - b) : [];
  }

  calculatePossibleMeetingHours(
    free: number[],
    allFree: number[],
    busy: number[],
    undesirable: number[],
    notGiven: number[],
    isAllUsersfree: boolean
  ): number[] {
    let hours: number[] = [];

    if (!isAllUsersfree) hours = without(notGiven, ...busy);

    if (!hours.length) hours = without([...allFree, ...undesirable], ...free, ...busy, ...notGiven);
    if (!hours.length) hours = without([...allFree, ...undesirable], ...free, ...busy);
    if (!hours.length) hours = without([...allFree, ...undesirable, ...notGiven], ...free, ...busy);

    return hours.length ? intersection(hours).sort((a, b) => a - b) : [];
  }

  generateRange(start: number, end: number): number[] {
    if (start === end) return [start];
    return [start, ...this.generateRange(start + 1, end)];
  }

  getAddingDropListId(timelineId: number): string {
    return this.addingDropListIdPrefix + timelineId;
  }

  getAllAddingDropListIds(): string[] {
    return this.meeting.timelines.map(line => this.getAddingDropListId(line.timelineId));
  }

}
