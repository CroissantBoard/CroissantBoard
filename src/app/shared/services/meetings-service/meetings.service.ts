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

  getAllMeetings(): Observable<any> {
    return this.meetings;
  }
  
  // setMeetings(users: string[]) {
  //   const batch = this.afs.firestore.batch();

  //   users.forEach((user) => {
  //     const userRef = this.afs.firestore.collection('users').doc();
  //     batch.set(userRef, { email: user });
  //   });

  //   batch.commit()
  // }
}
