import { Component, Input, Output, EventEmitter, HostBinding, OnChanges } from '@angular/core';

import { MainContainer } from 'src/app/shared/interfaces/timeline/main-container';

@Component({
  selector: 'app-timeline-main-container',
  templateUrl: './timeline-main-container.component.html',
  styleUrls: ['./timeline-main-container.component.scss']
})
export class TimelineMainContainerComponent implements OnChanges {

  @Input() isTimelineBarItem: boolean = false;
  @Input() status: string = '';

  @Input() container: MainContainer;

  @Input() percentWidth: string;
  @Input() percentMarginLeft: string;

  @Output() deleteContainerEvent: EventEmitter<number> = new EventEmitter();

  @HostBinding('style.width') hostWidth: string;
  @HostBinding('style.margin-left') hostMarginLeft: string;

  constructor() { }

  ngOnChanges(): void {
    this.hostWidth = this.percentWidth;
    this.hostMarginLeft = this.percentMarginLeft;
  }

  emitDeleteContainerEvent(): void {
    this.deleteContainerEvent.emit(this.container.id);
  }

}
