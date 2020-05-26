import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-timeline-bar',
  templateUrl: './timeline-bar.component.html',
  styleUrls: ['./timeline-bar.component.scss']
})
export class TimelineBarComponent implements OnChanges {

  @Input() allTimelines: any[] = [];
  @Input() timelineBarId: string;

  addingDropListIds: string[] = [];
  
  timelineAddingItems: string[] = ['busy', 'free', 'undesirable'];

  movingItem: string = '';

  constructor() { }

  ngOnChanges(): void {
    if (this.allTimelines && this.timelineBarId) {
      this.addingDropListIds = this.allTimelines.map(item => item.addingDropListId);
    }
  }

  startMoving(item: string): void {
    this.movingItem = item;
  }

  stopMoving(): void {
    this.movingItem = '';
  }

}
