import { Pipe, PipeTransform } from '@angular/core';

import { Meeting } from '../../interfaces/meeting';

@Pipe({
  name: 'sortUpcomingMeetings'
})
export class SortUpcomingMeetingsPipe implements PipeTransform {

  transform(meetings: Meeting[]): Meeting[] {
    return meetings.sort((a, b) => {
      return a.hour < b.hour
        && a.meetingDay.toDate().getTime() < b.meetingDay.toDate().getTime()
          ? -1
          : 1; 
    });
  }

}
