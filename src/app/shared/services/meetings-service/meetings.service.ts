import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Meeting } from '../../interfaces/meeting';

import getToday from '../../helpers/getToday';


@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  meetingsCollection: AngularFirestoreCollection<Meeting>
  meetings: Observable<Meeting[]>
  meetingDoc: AngularFirestoreDocument<Meeting>

  today: Date = getToday();

  constructor(private afs: AngularFirestore) {
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
  }

  addMeeting(meeting: Meeting) {
    this.meetingsCollection.add(meeting);
  }

  deleteMeeting(meetingId: Meeting) {
    this.meetingDoc = this.afs.doc(`meetings/${meetingId}`);
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

  getAllMeetings(): Observable<any> {
    return this.meetings;
  }
}
