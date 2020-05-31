import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Meeting } from '../../interfaces/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  meetingsCollection: AngularFirestoreCollection<Meeting>
  meetings: Observable<Meeting[]>
  meetingDoc: AngularFirestoreDocument<Meeting>

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

  getMeetings(workspaceId: string): Observable<any> {
    return this.afs
      .collection('meetings', (ref) => ref.where('workspaceId', '==', workspaceId))
      .valueChanges({ idField: 'id' });
  }

  getMeetingById(meetingId: string): Observable<any> {
    return this.afs.doc(`meetings/${meetingId}`).valueChanges();
  }

  getMeetingByDay(projectId: string, meetingDay: Date): Observable<any> {
    return this.afs
      .collection('meetings', (ref) =>
        ref.where('projectId', '==', projectId)
        .where('meetingDay', '==', meetingDay))
      .valueChanges({ idField: 'id' });

    // return this.afs
    //   .collection('meetings', (ref) => ref.where('workspaceId', '==', workspaceId)
    //   .where('meetingDay', '==', meetingDay))
    //   .valueChanges({ idField: 'id' });
  }

  getAllMeetings(): Observable<any> {
    return this.meetings;
  }
}
