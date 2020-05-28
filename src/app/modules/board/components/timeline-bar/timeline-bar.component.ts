import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-bar',
  templateUrl: './timeline-bar.component.html',
  styleUrls: ['./timeline-bar.component.scss']
})
export class TimelineBarComponent {

  @Input() addingDropListIds: string[] = [];
  @Input() timelineBarId: string;
  
  timelineAddingItems: string[] = ['busy', 'free', 'undesirable'];

  movingItem: string = '';

  constructor() { }

  startMoving(item: string): void {
    this.movingItem = item;
  }

  stopMoving(): void {
    this.movingItem = '';
  }

}
