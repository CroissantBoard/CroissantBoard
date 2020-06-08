import { TimelineObject } from './timeline/timeline-object';

export interface Meeting {
  id: string,
  meetingDay: any,
  hour: number,
  name: string,
  projectId: string,
  projectName: string,
  isFinished: boolean,
  isInit: boolean,
  timelines: TimelineObject[],
}
