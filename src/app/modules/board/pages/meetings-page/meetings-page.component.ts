import { Component, OnInit, OnDestroy } from '@angular/core';

import { intersection, union, without } from 'lodash';

import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { UserService } from 'src/app/shared/services/user.service';
import { MeetingsService } from 'src/app/shared/services/meetings-service/meetings.service';

import { TimelineObject } from 'src/app/shared/interfaces/timeline/timeline-object';
import { Meeting } from 'src/app/shared/interfaces/meeting';

import formatTime from 'src/app/shared/helpers/formatTime';

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

  projectId = 'ihcItSSRof4Tw8z99QD2'; // hardcoded
  userIds: string[] = [];

  meeting: Meeting;
  meetingDay: Date;

  bestMeetingHours: number[] = [];
  possibleMeetingHours: number[] = [];

  constructor(
    private meetingsService: MeetingsService,
    private userService: UserService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.updateMeeting();
  }

  ngOnInit(): void {
    this.resetMeetingDay();

    this.userService.getUsersByProject(this.projectId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(users => {
      this.userIds = users.map(user => user.uid);

      if (!this.meeting.timelines.length) {
        this.meeting.timelines = this.userIds.map((user, index) => ({
          timelineId: index,
          uid: user,
          data: [],
        }));
      }
    });
  }

  fetchMeeting(): void {
    this.meetingsService.getMeetingByDay(this.projectId, this.meetingDay).pipe(
      take(1)
    ).subscribe(meetings => {
      this.meeting = meetings.length
        ? meetings[0]
        : this.createNewMeeting();

      this.calculateMeetingHours();
    });
  }

  onChangeMeetingDay(): void {
    this.fetchMeeting();
  }

  resetMeetingDay(): void {
    this.meetingDay = this.formatDate(new Date());

    this.fetchMeeting();
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

    this.calculateMeetingHours();

    if (this.meeting.id !== null) {
      this.updateMeeting();
    } else {
      this.meetingsService.addMeeting(this.meeting);

      this.fetchMeeting();
    }
  }

  setMeetingHour(hour: number): void {
    this.meeting.hour = hour;
    this.updateMeeting();
  }

  calculateMeetingHours(): void {
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

  formatDate(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
  }
  
  formatTime(num: number): string {
    return formatTime(num);
  }

  createNewMeeting(): Meeting {
    return {
      id: null,
      meetingDay: this.meetingDay,
      hour: 0,
      name: '',
      projectId: this.projectId,
      isFinished: false,
      timelines: this.userIds
        ? this.userIds.map((id, index) => ({
          timelineId: index,
          uid: id,
          data: [],
        }))
        : [],
    }
  }

  getAddingDropListId(timelineId: number): string {
    return this.addingDropListIdPrefix + timelineId;
  }

  getAllAddingDropListIds(): string[] {
    return this.meeting.timelines.map(line => this.getAddingDropListId(line.timelineId));
  }

}
