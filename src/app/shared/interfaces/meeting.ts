import { TimelineObject } from './timeline/timeline-object';

export interface Meeting {
  id: string,
  date: Date,
  name: string,
  project: string,
  isFinished: boolean,
  timelines: TimelineObject[],
}
