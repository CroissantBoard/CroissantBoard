import { MainContainer } from './main-container';

export interface TimelineObject {
  timelineId: number,
  uid: string,
  data: MainContainer[],
}
