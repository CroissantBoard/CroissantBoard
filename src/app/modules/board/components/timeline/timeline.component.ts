import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDragMove } from '@angular/cdk/drag-drop';

import { flatten } from 'lodash';

import { MainContainer } from 'src/app/shared/interfaces/timeline/main-container';
import { GhostContainer } from 'src/app/shared/interfaces/timeline/ghost-container';
import { TimelineEndpoint } from 'src/app/shared/interfaces/timeline/timeline-endpoint';
import { TimelineSwapsItem } from 'src/app/shared/interfaces/timeline/timeline-swaps-item';
import { TimelineObject } from 'src/app/shared/interfaces/timeline/timeline-object';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {

  @Input() timelineId: number;
  @Input() timelineData: MainContainer[];

  @Input() addingDropListId: string;
  @Input() timelineBarId: string;

  @Output() changedTimelineEvent: EventEmitter<TimelineObject> = new EventEmitter();

  mainContainers: MainContainer[] = [];
  ghostContainers: GhostContainer[] = [];

  timelineStarts: TimelineEndpoint[] = new Array(24).fill(null);
  timelineEnds: TimelineEndpoint[] = new Array(24).fill(null);
  timelineSwaps: TimelineSwapsItem[] = new Array(24).fill(null);

  timelineAddingItems: string[] = new Array(this.timelineSwaps.length - 1).fill(null);

  movingItem: TimelineEndpoint | TimelineSwapsItem = null;

  timelinePointWidth: number = 100 / this.timelineSwaps.length;

  constructor() { }

  ngOnChanges(): void {
    if (this.timelineData) {
      this.mainContainers = this.timelineData;

      this.setInitialTimelineItems();
      this.setInitialContainerSizes();
    }
  }

  setInitialTimelineItems(): void {
    this.mainContainers.forEach(cont => {
      this.timelineStarts[cont.indexes[0]] = { id: cont.id, value: 'start' };
      this.timelineEnds[cont.indexes[1]] = { id: cont.id, value: 'end' };

      this.ghostContainers.push({
        id: cont.id,
        width: cont.width,
        prevStartX: cont.startX,
        startX: cont.startX,
        prevEndX: cont.endX,
        endX: cont.endX,
      })
    });
  }

  setInitialContainerSizes(): void {
    [this.timelineStarts, this.timelineEnds].forEach(timeline => {
      timeline.forEach((item, index) => {
        if (item) {
          this.changeContainerSizeByPoint(item.id, item.value, index);
        }
      });
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

  addItem(array: TimelineEndpoint[] | TimelineSwapsItem[], currIndex: number, item: TimelineEndpoint | TimelineSwapsItem): void {
    array[currIndex] = item;
    this.changeContainerSizeByPoint(array[currIndex].id, item.value, currIndex);
  }

  drop($event: CdkDragDrop<TimelineEndpoint[]>): void {
    const value: string = $event.item.data.value;

    if (this.checkEndpoint($event.previousIndex, $event.currentIndex, value)) {

      this.moveItem(
        value === "start" ? this.timelineStarts : this.timelineEnds,
        $event.previousIndex,
        $event.currentIndex,
        value
      );

      this.emitChangedTimelineEvent();

    } else {
      this.returnGhostContainerSize(value === "start"
        ? $event.item.data.id
        : $event.item.data.id);
    }

    this.stopMoving();
  }

  swapDrop($event: CdkDragDrop<TimelineSwapsItem[]>): void {

    const widthPoints = $event.item.data.indexes[1] - $event.item.data.indexes[0];

    this.returnGhostContainerSize($event.item.data.id);

    if (this.checkSwap(widthPoints, $event.item.data.id, $event.currentIndex)) {

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

      this.emitChangedTimelineEvent();
    }

    this.stopMoving();
  }

  addDrop($event: CdkDragDrop<string[]>): void {
    if (this.checkAdd($event.currentIndex)) {

      const id = this.mainContainers.length
        ? Math.max(...this.mainContainers.map(cont => cont.id)) + 1
        : 0;

      this.mainContainers.push({
        id,
        indexes: [$event.currentIndex, $event.currentIndex],
        width: 0,
        startX: 0,
        endX: 0,
        totalHours: 0,
        status: $event.item.data
      });

      this.ghostContainers.push({
        id,
        width: 0,
        prevStartX: 0,
        startX: 0,
        prevEndX: 0,
        endX: 0,
      });

      const startItem: TimelineEndpoint = { id, value: 'start' };
      const endItem: TimelineEndpoint = { id, value: 'end' };
      const swapItem: TimelineSwapsItem = {
        id,
        value: 'swap',
        indexes: [$event.currentIndex, $event.currentIndex],
        isStart: true,
      };

      this.addItem(this.timelineStarts, $event.currentIndex, startItem);
      this.addItem(this.timelineEnds, $event.currentIndex, endItem);
      this.addItem(this.timelineSwaps, $event.currentIndex, swapItem);

      this.emitChangedTimelineEvent();
    }
  }

  onDragMove($event: CdkDragMove, item: TimelineEndpoint | TimelineSwapsItem): void {
    const containerIndex = this.ghostContainers.findIndex(cont => cont.id === item.id);

    const delta = 100 / $event.source.dropContainer.element.nativeElement.offsetWidth * $event.distance.x;

    if (item.value === 'start') {
      this.ghostContainers[containerIndex].startX = this.formatNumber(this.ghostContainers[containerIndex].prevStartX + delta);
    }

    if (item.value === 'end') {
      this.ghostContainers[containerIndex].endX = this.formatNumber(this.ghostContainers[containerIndex].prevEndX + delta);
    }

    if (item.value === 'swap') {
      this.ghostContainers[containerIndex].startX = this.formatNumber(this.ghostContainers[containerIndex].prevStartX + delta);
      this.ghostContainers[containerIndex].endX = this.formatNumber(this.ghostContainers[containerIndex].prevEndX + delta);
    }

    this.changeContainerSize(this.ghostContainers, containerIndex);
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

  checkSwap(widthPoints: number, id: number, currIndex: number): boolean {
    const lastIndex = currIndex + widthPoints;

    if (lastIndex >= this.timelineSwaps.length) return false;

    for (let i = currIndex; i <= lastIndex; i++) {
      if (this.timelineSwaps[i] !== null && this.timelineSwaps[i].id !== id) return false;
    }

    return true;
  }

  checkAdd(index: number): boolean {
    return this.timelineSwaps[index] === null;
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

    const preWidth = this.formatNumber(containerArr[idx].endX - containerArr[idx].startX);

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

  deleteContainer(id: number): void {
    const deleteInContainers = (arrays: Array<MainContainer[] | GhostContainer[]>) =>
      arrays.forEach(array =>
        array.forEach((cont: MainContainer | GhostContainer, index: number) => {
          if (cont.id === id) {
            array.splice(index, 1);
            return
          }
        })
      );

    const deleteInTimelines = (timelines: Array<TimelineEndpoint[] | TimelineSwapsItem[]>) =>
      timelines.forEach(line =>
        line.forEach((item, index) => {
          if (item) {
            if (item.id === id) line[index] = null;
          }
        })
      );

    deleteInContainers([this.mainContainers, this.ghostContainers]);
    deleteInTimelines([this.timelineStarts, this.timelineEnds, this.timelineSwaps]);

    this.emitChangedTimelineEvent();
  }

  calculatePosition(index: number, startOrEnd: string): number {
    const position = this.timelinePointWidth * index;

    return startOrEnd === 'start'
      ? this.formatNumber(position)
      : this.formatNumber(position + this.timelinePointWidth);
  }

  percentString(num: number): string {
    return `${num}%`;
  }

  formatNumber(num: number): number {
    return Number(num.toFixed(2));
  }

  startMoving(item: TimelineEndpoint | TimelineSwapsItem): void {
    this.movingItem = item;
  }

  stopMoving(): void {
    this.movingItem = null;
  }

  emitChangedTimelineEvent(): void {
    const eventObject: TimelineObject = {
      id: this.timelineId,
      data: this.mainContainers,
    };

    this.changedTimelineEvent.emit(eventObject);
  }

}
