import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-timeline-bar',
  templateUrl: './timeline-bar.component.html',
  styleUrls: ['./timeline-bar.component.scss']
})
export class TimelineBarComponent implements OnInit, OnChanges {

  @Input() allTimelines: any[] = [];
  @Input() timelineBarId: string;

  addingDropListIds: string[] = [];
  
  timelineAddingItems: string[] = ['busy', 'free', 'undesirable'];

  movingItem: string = '';

  constructor() { }

  ngOnChanges(): void {
    if (this.allTimelines && this.timelineBarId) {
      this.addingDropListIds = this.allTimelines.map(item => item.addingDropListId);
      console.log(this.addingDropListIds)
      console.log(this.timelineBarId)
    }
  }

  ngOnInit(): void {
  }

  startMoving(item: string): void {
    this.movingItem = item;
  }

  stopMoving(): void {
    this.movingItem = '';
  }

  log($event): void {
    console.log($event);
  }

}
