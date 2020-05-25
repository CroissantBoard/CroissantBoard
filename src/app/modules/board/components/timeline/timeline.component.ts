import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDragMove } from '@angular/cdk/drag-drop';

import { flatten } from 'lodash';

import { MainContainer } from 'src/app/shared/interfaces/timeline/main-container';
import { GhostContainer } from 'src/app/shared/interfaces/timeline/ghost-container';
import { TimelineEndpoint } from 'src/app/shared/interfaces/timeline/timeline-endpoint';
import { TimelineSwapsItem } from 'src/app/shared/interfaces/timeline/timeline-swaps-item';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  mainContainers: MainContainer[] = [
    {
      id: 0,
      indexes: [0, 0],
      width: 0,
      startX: 0,
      endX: 0,
      totalHours: 0,
      status: 'busy',
    },
    {
      id: 1,
      indexes: [0, 0],
      width: 0,
      startX: 0,
      endX: 0,
      totalHours: 0,
      status: 'free',
    },
    {
      id: 2,
      indexes: [0, 0],
      width: 0,
      startX: 0,
      endX: 0,
      totalHours: 0,
      status: 'undesirable',
    }
  ];

  ghostContainers: GhostContainer[] = [
    {
      id: 0,
      width: 0,
      prevStartX: 0,
      startX: 0,
      prevEndX: 0,
      endX: 0,
    },
    {
      id: 1,
      width: 0,
      prevStartX: 0,
      startX: 0,
      prevEndX: 0,
      endX: 0,
    },
    {
      id: 2,
      width: 0,
      prevStartX: 0,
      startX: 0,
      prevEndX: 0,
      endX: 0,
    }
  ];

  timelineStarts: TimelineEndpoint[] = new Array(24).fill(null);
  timelineEnds: TimelineEndpoint[] = new Array(24).fill(null);
  timelineSwaps: TimelineSwapsItem[];

  movingItem: TimelineEndpoint | TimelineSwapsItem = null;

  timelinePointWidth: number = 100 / this.timelineStarts.length;

  constructor() { }

  ngOnInit(): void {
    this.timelineStarts[5] = { id: 0, value: 'start' };
    this.timelineEnds[9] = { id: 0, value: 'end' };

    this.timelineStarts[11] = { id: 1, value: 'start' };
    this.timelineEnds[17] = { id: 1, value: 'end' };

    this.timelineStarts[19] = { id: 2, value: 'start' };
    this.timelineEnds[22] = { id: 2, value: 'end' };

    this.setInitialContainerSizes(this.timelineStarts);
    this.setInitialContainerSizes(this.timelineEnds);

    this.fillTimelineSwaps();
  }

  setInitialContainerSizes(timeline: TimelineEndpoint[]): void {
    timeline.forEach((item, index) => {
      if (item) {
        this.changeContainerSizeByPoint(item.id, item.value, index);
      }
    });
  }

  fillTimelineSwaps(): void {
    this.timelineSwaps = new Array(24).fill(null);

    this.timelineEnds.forEach((item, index) => {
      if (item) {
        const itemStartIndex = this.timelineStarts.findIndex(start => { if (start) return start.id === item.id });

        for (let i = itemStartIndex; i <= index; i++) {
          this.timelineSwaps[i] = {
            id: item.id,
            value: 'swap',
            indexes: [itemStartIndex, index],
            isStart: i === itemStartIndex,
          }
        }
      }
    });
  }

  moveItem(array: TimelineEndpoint[], prevIndex: number, currIndex: number, value: string): void {
    moveItemInArray(array, prevIndex, currIndex);
    
    this.changeContainerSizeByPoint(array[currIndex].id, value, currIndex);
  }

  replaceItem(array: TimelineEndpoint[], prevIndex: number, currIndex: number, value: string): void {
    let oldTarget = array[prevIndex];
    array[prevIndex] = array[currIndex];
    array[currIndex] = oldTarget;
    
    this.changeContainerSizeByPoint(array[currIndex].id, value, currIndex);
  }

  drop($event: CdkDragDrop<TimelineEndpoint[]>): void {
    const value: string = $event.container.data.filter(item => item)[0].value;

    if (this.checkEndpoint($event.previousIndex, $event.currentIndex, value)) {

      this.moveItem(
        value === "start" ? this.timelineStarts : this.timelineEnds,
        $event.previousIndex,
        $event.currentIndex,
        value
      );

    } else {
      this.returnGhostContainerSize(value === "start"
        ? this.timelineStarts[$event.previousIndex].id
        : this.timelineEnds[$event.previousIndex].id);
    }

    this.stopMoving();
  }

  swapDrop($event: CdkDragDrop<TimelineSwapsItem[]>): void {

    const widthPoints = this.timelineSwaps[$event.previousIndex].indexes[1] - this.timelineSwaps[$event.previousIndex].indexes[0];

    this.returnGhostContainerSize(this.timelineSwaps[$event.previousIndex].id);

    if (this.checkSwap(widthPoints, this.timelineSwaps[$event.previousIndex].id, $event.currentIndex)) {

      this.replaceItem(
        this.timelineStarts,
        $event.previousIndex,
        $event.currentIndex,
        'start'
      );

      this.replaceItem(
        this.timelineEnds,
        $event.previousIndex + widthPoints,
        $event.currentIndex + widthPoints,
        'end'
      );
    }

    this.stopMoving();
  }

  onDragMove($event: CdkDragMove, item: TimelineEndpoint | TimelineSwapsItem): void {
    const containerIndex = this.ghostContainers.findIndex(cont => cont.id === item.id);

    const delta = 100 / $event.source.element.nativeElement.parentElement.offsetWidth * $event.distance.x;

    if (item.value === 'start') {
      const prevX = this.ghostContainers[containerIndex].prevStartX;
      const newStartX = this.ghostContainers[containerIndex].prevStartX + delta;

      this.ghostContainers[containerIndex].startX = newStartX < prevX ? newStartX : prevX;
    }

    if (item.value === 'end') {
      this.ghostContainers[containerIndex].endX = this.ghostContainers[containerIndex].prevEndX + delta;
    }

    if (item.value === 'swap') {
      const newStartX = this.ghostContainers[containerIndex].prevStartX + delta;
      const newEndX = this.ghostContainers[containerIndex].prevEndX + delta;
  
      this.ghostContainers[containerIndex].startX = newStartX;
      this.ghostContainers[containerIndex].endX = newEndX;
    }

    this.changeContainerSize(this.ghostContainers, containerIndex);
  }

  checkSwap(widthPoints: number, id: number, currIndex: number): boolean {
    const lastIndex = currIndex + widthPoints;

    if (lastIndex >= this.timelineSwaps.length) return false;

    for (let i = currIndex; i <= lastIndex; i++) {
      if (this.timelineSwaps[i] !== null && this.timelineSwaps[i].id !== id) return false;
    }

    return true;
  }

  checkEndpoint(previousIndex: number, currentIndex: number, value: string): boolean {
    const indexes = flatten(this.mainContainers.map(item => item.indexes));

    const closestRight = Math.min(...indexes.filter(index => index > previousIndex));
    const closestLeft = Math.max(...indexes.filter(index => index < previousIndex));

    if (value === 'start') return currentIndex <= closestRight && currentIndex > closestLeft;

    if (value === 'end') return currentIndex < closestRight
      && currentIndex >= (closestLeft === -Infinity ? previousIndex : closestLeft);

    return false;
  }

  changeContainerSizeByPoint(id: number, value: string, index: number): void {
    this.fillTimelineSwaps();

    const containerIndex = this.mainContainers.findIndex(item => item.id === id);

    if (containerIndex !== -1) {
      if (value === 'start') {
        this.mainContainers[containerIndex].startX = this.calculatePosition(index, 'start');
        this.mainContainers[containerIndex].indexes[0] = index;
      }

      if (value === 'end') {
        this.mainContainers[containerIndex].endX = this.calculatePosition(index, 'end');
        this.mainContainers[containerIndex].indexes[1] = index;
      }

      const indexes = this.mainContainers[containerIndex].indexes;

      this.mainContainers[containerIndex].totalHours = (indexes[1] - indexes[0]) + 1;

      this.changeContainerSize(this.mainContainers, containerIndex);

      this.returnGhostContainerSize(id);
    }
  }

  changeContainerSize(containerArr: MainContainer[] | GhostContainer[], idx: number): void {
    const preWidth = containerArr[idx].endX - containerArr[idx].startX;

    if (preWidth > 0) {
      containerArr[idx].width = preWidth;
    }
  }

  returnGhostContainerSize(id: number): void {
    const mainContainer = this.mainContainers.find(cont => cont.id === id);

    this.ghostContainers.forEach(ghost => {
      if (ghost.id === id) {
        ghost.width = mainContainer.width;
        ghost.prevStartX = mainContainer.startX;
        ghost.startX = mainContainer.startX;
        ghost.prevEndX = mainContainer.endX;
        ghost.endX = mainContainer.endX;
        return;
      }
    });
  }

  calculatePosition(index: number, startOrEnd: string): number {
    const position = (this.timelinePointWidth * index);

    return startOrEnd === 'start' ? position : position + this.timelinePointWidth;
  }

  percentString(num: number): string {
    return `${num}%`;
  }

  startMoving(item: TimelineEndpoint | TimelineSwapsItem): void {
    this.movingItem = item;
  }

  stopMoving(): void {
    this.movingItem = null;
  }

}
