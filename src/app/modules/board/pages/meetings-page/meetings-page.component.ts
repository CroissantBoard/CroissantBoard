import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { AuthService } from 'src/app/core/authentification/auth.service';
import { MeetingsService } from 'src/app/shared/services/meetings-service/meetings.service';
import { ProjectService } from 'src/app/shared/services/project.service';

import { TimelineObject } from 'src/app/shared/interfaces/timeline/timeline-object';
import { Meeting } from 'src/app/shared/interfaces/meeting';
import IProject from 'src/app/shared/interfaces/Project';

import { intersection, union, without } from 'lodash';

import generateRange from 'src/app/shared/helpers/generateRange';
import getToday from 'src/app/shared/helpers/getToday';
import formatTime from 'src/app/shared/helpers/formatTime';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  isLoading: boolean = true;

  rulerLength: number = 24;

  timelineBarId: string = 'addingItemsList';
  addingDropListIdPrefix: string = 'addingDropListId_';

  currentUserId: string = '';

  project: IProject;

  allProjectMeetings: Meeting[] = [];

  meeting: Meeting;
  meetingDay: Date;

  bestMeetingHours: number[] = [];
  possibleMeetingHours: number[] = [];

  meetingNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor(
    private router: Router,
    private auth: AuthService,
    private meetingsService: MeetingsService,
    private projectService: ProjectService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.meetingDay = getToday();

    this.auth.getCurrentUser()
      .subscribe(user => this.currentUserId = user.uid);

    this.projectService.getCurrentProject().pipe(
      takeUntil(this.destroy$)
    ).subscribe(project => {
      if (!project) {
        this.router.navigate(['/board/home']);
        return;
      }

      this.project = project;

      this.meetingsService.getMeetings(this.project.uid).pipe(
        takeUntil(this.destroy$)
      ).subscribe(meetings => {
        this.allProjectMeetings = meetings;
      });

      this.fetchMeeting();
    });
  }

  fetchMeeting(): void {
    this.meetingsService.getMeetingByDay(this.project.uid, this.meetingDay).pipe(
      take(1)
    ).subscribe(meeting => {
      this.meeting = meeting[0];

      if (this.isLoading) this.isLoading = false;

      if (this.meeting) this.calculateMeetingHours();
    });
  }

  changeMeetingDay(day: Date): void {
    this.meetingDay = day;

    this.fetchMeeting();
  }

  updateMeeting() {
    this.meeting.isInit = false;
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
    }
  }

  setMeetingHour(hour: number): void {
    this.meeting.hour = hour;
    this.meeting.isInit = false;
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

    if (this.meetingDay.getTime() === getToday().getTime()) {
      this.bestMeetingHours = this.bestMeetingHours.filter(hour => hour > new Date().getHours())
      this.possibleMeetingHours = this.possibleMeetingHours.filter(hour => hour > new Date().getHours())
    }
  }

  sortHoursInDifferentArrays(): Array<number[]> {
    let free: number[] = [],
      allFree: number[] = [];

    let busy: number[] = [],
      undesirable: number[] = [],
      notGiven: number[] = [];

    this.meeting.timelines.forEach(line => {
      let lineNotGivenHours: number[] = generateRange(0, 23);

      line.data.forEach(cont => {
        const hours = generateRange(cont.indexes[0], cont.indexes[1]);

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

  formatTime(num: number): string {
    return formatTime(num);
  }

  createNewMeeting(name: string): Meeting {
    return {
      id: null,
      meetingDay: this.meetingDay,
      hour: 0,
      name,
      projectId: this.project.uid,
      projectName: this.project.name,
      isFinished: false,
      isInit: true,
      users: this.project.participants,
      timelines: this.project.participants.map((id, index) => ({
          timelineId: index,
          userId: id,
          data: [],
        }))
    }
  }

  datepickerFilter = (date: Date | null): boolean => {
    return this.currentUserId === this.project.createdBy
      ? true
      : !!this.allProjectMeetings.find(meeting =>
        (!meeting.isInit && date.getTime() === meeting.meetingDay.toDate().getTime()));
  }

  addMeeting() {
    const name = (this.meetingNameFormControl.value || '').trim();

    if (name) {
      this.meetingsService.addMeeting(this.createNewMeeting(name));

      this.meetingNameFormControl.setValue('');
      this.meetingNameFormControl.setErrors([]);

      this.fetchMeeting();
    } else {
      this.meetingNameFormControl.setValue('');
      this.meetingNameFormControl.setErrors(['invalid', 'required']);
    }
  }

  deleteMeeting(meetingId: string): void {
    this.meetingsService.deleteMeeting(meetingId);

    this.fetchMeeting();
  }

  getAddingDropListId(timelineId: number): string {
    return this.addingDropListIdPrefix + timelineId;
  }

  getAllAddingDropListIds(): string[] {
    const foundLine = this.meeting.timelines.find(line => this.currentUserId === line.userId);

    return this.currentUserId === this.project.createdBy
      ? this.meeting.timelines.map(line => this.getAddingDropListId(line.timelineId))
      : foundLine ? [this.getAddingDropListId(foundLine.timelineId)] : [];
  }

}
