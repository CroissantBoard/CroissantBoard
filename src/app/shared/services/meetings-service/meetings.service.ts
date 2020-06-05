import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Meeting } from '../../interfaces/meeting';

import getToday from '../../helpers/getToday';
import { UserService } from '../user.service';
import { ProjectService } from '../project.service';
import { TimelineObject } from '../../interfaces/timeline/timeline-object';
import { AuthService } from 'src/app/core/authentification/auth.service';


@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  meetingsCollection: AngularFirestoreCollection<Meeting>;
  meetings: Observable<Meeting[]>;
  meetingDoc: AngularFirestoreDocument<Meeting>;

  currentUserMeetings: BehaviorSubject<Meeting[]> = new BehaviorSubject<Meeting[]>([]);

  today: Date = getToday();

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private userService: UserService,
    private projectService: ProjectService,
  ) {
    this.meetingsCollection = this.afs.collection('meetings')
    this.meetings = this.meetingsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Meeting
          data.id = a.payload.doc.id
          return data
        })
      })
    );

    this.meetings.subscribe(meetings => {
      meetings.forEach(meeting => {
        const day = meeting.meetingDay.toDate();
        if (
          day < this.today
          || (!meeting.isInit && day === this.today && meeting.hour + 1 <= new Date().getHours())
        ) {
          meeting.isFinished = true;

          this.meetingDoc = this.afs.doc(`meetings/${meeting.id}`);
          this.meetingDoc.update(meeting);
        }
      });
    });

    this.auth.getCurrentUser().subscribe(user => {
      let meetings: Meeting[] = [];
      user.meetings.forEach(meetingId => this.getMeetingById(meetingId).subscribe(meeting => {
        if (!meeting.isFinished && !meeting.isInit) meetings.push(meeting);
      }));

      this.currentUserMeetings.next(meetings);
    });
  }

  addMeeting(meeting: Meeting) {
    this.meetingsCollection.add(meeting).then(doc => {
      this.meetingDoc = this.afs.doc(`meetings/${doc.id}`);

      this.meetingDoc.get().subscribe(meetingData => {
        this.projectService.addMeetingToProject(doc.id);

        meetingData.data().timelines.forEach((line: TimelineObject) =>
          this.userService.addMeetingToUser(doc.id, line.userId));
      });
    });
  }

  deleteMeeting(meetingId: string) {
    this.meetingDoc = this.afs.doc(`meetings/${meetingId}`);

    this.meetingDoc.get().subscribe(meetingData => {
      this.projectService.deleteMeetingFromProject(meetingId);

      meetingData.data().timelines.forEach((line: TimelineObject) =>
        this.userService.deleteMeetingFromUser(meetingId, line.userId));
    });

    this.meetingDoc.delete();
  }

  updateMeeting(meeting: Meeting) {
    this.meetingDoc = this.afs.doc(`meetings/${meeting.id}`);
    this.meetingDoc.update(meeting);
  }

  getMeetings(projectId: string): Observable<any> {
    return this.afs
      .collection('meetings', (ref) =>
        ref.where('projectId', '==', projectId))
      .valueChanges({ idField: 'id' });
  }

  getMeetingById(meetingId: string): Observable<any> {
    return this.afs.doc(`meetings/${meetingId}`).valueChanges();
  }

  getMeetingByDay(projectId: string, meetingDay: Date): Observable<any> {
    return this.afs
      .collection('meetings', (ref) =>
        ref.where('projectId', '==', projectId)
          .where('meetingDay', '==', meetingDay)
          .where('isFinished', '==', false))
      .valueChanges({ idField: 'id' });
  }

  getAllMeetings(): Observable<Meeting[]> {
    return this.meetings;
  }

  getCurrentUserMeetings(): Observable<Meeting[]> {
    return this.currentUserMeetings;
  }
}
