import { Pipe, PipeTransform } from '@angular/core';

import { Meeting } from '../../interfaces/meeting';

@Pipe({
  name: 'sortUpcomingMeetings'
})
export class SortUpcomingMeetingsPipe implements PipeTransform {

  transform(meetings: Meeting[]): Meeting[] {
    return meetings.sort((a, b) => a.meetingDay.toDate().getTime() - b.meetingDay.toDate().getTime())
      .sort((a, b) => a.meetingDay.toDate().getTime() === b.meetingDay.toDate().getTime()
        ? a.hour - b.hour
        : 0
      );
  }

}
