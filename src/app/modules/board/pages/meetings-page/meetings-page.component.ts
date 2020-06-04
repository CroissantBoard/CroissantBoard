import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { intersection, union, without } from 'lodash';

import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { UserService } from 'src/app/shared/services/user.service';
import { MeetingsService } from 'src/app/shared/services/meetings-service/meetings.service';
import { ProjectService } from 'src/app/shared/services/project.service';

import { TimelineObject } from 'src/app/shared/interfaces/timeline/timeline-object';
import { Meeting } from 'src/app/shared/interfaces/meeting';

import formatTime from 'src/app/shared/helpers/formatTime';
import generateRange from 'src/app/shared/helpers/generateRange';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { FormControl, Validators } from '@angular/forms';

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
  projectCreatorId: string = '';
  projectId: string = '';
  userIds: string[] = [];

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
    private userService: UserService,
    private projectService: ProjectService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.meetingDay = this.formatDate(new Date());

    this.auth.getCurrentUser()
      .subscribe(user => this.currentUserId = user.uid);

    this.projectService.getCurrentProject().pipe(
      takeUntil(this.destroy$)
    ).subscribe(project => {
      this.userIds = [];

      if (!project) {
        this.router.navigate(['/board/home']);
        return;
      }

      console.log(project)

      this.projectCreatorId = project.createdBy;
      this.projectId = project.uid;

      this.meetingsService.getMeetings(this.projectId).pipe(
        takeUntil(this.destroy$)
      ).subscribe(meetings => {
        this.allProjectMeetings = meetings;
      });

      this.userService.getUsersByProject(this.projectId).pipe(
        takeUntil(this.destroy$)
      ).subscribe(users => {
        this.userIds = users.map(user => user.uid)

        this.fetchMeeting();
      });
    });
  }

  fetchMeeting(): void {
    this.meetingsService.getMeetingByDay(this.projectId, this.meetingDay).pipe(
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

  formatDate(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
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
      projectId: this.projectId,
      isFinished: false,
      isInit: true,
      timelines: this.userIds
        ? this.userIds.map((id, index) => ({
          timelineId: index,
          userId: id,
          data: [],
        }))
        : [],
    }
  }

  datepickerFilter = (date: Date | null): boolean => {
    return this.currentUserId === this.projectCreatorId
      ? true
      : !!this.allProjectMeetings.find(meeting =>
        date === meeting.meetingDay);
  }

  addMeeting() {
    const name = (this.meetingNameFormControl.value || '').trim();

    if (name) {
      this.meetingsService.addMeeting(this.createNewMeeting(name));

      this.fetchMeeting();
    } else {
      this.meetingNameFormControl.setValue('');
      this.meetingNameFormControl.setErrors(['invalid', 'required']);
    }
  }

  getAddingDropListId(timelineId: number): string {
    return this.addingDropListIdPrefix + timelineId;
  }

  getAllAddingDropListIds(): string[] {
    return this.currentUserId === this.projectCreatorId
      ? this.meeting.timelines.map(line => this.getAddingDropListId(line.timelineId))
      : [this.getAddingDropListId(
          this.meeting.timelines.find(line => this.currentUserId === line.userId).timelineId
        )];
  }

}
