import { TimelineObject } from './timeline/timeline-object';

export default interface Meeting {
  id: string,
  meetingDay: Date,
  hour: number,
  name: string,
  projectId: string,
  isFinished: boolean,
  timelines: TimelineObject[],
}
