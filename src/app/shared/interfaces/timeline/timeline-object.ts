import { MainContainer } from './main-container';

export interface TimelineObject {
  timelineId: number,
  userId: string,
  data: MainContainer[],
}
