import { Component, OnChanges, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-timeline-ghost-container',
  templateUrl: './timeline-ghost-container.component.html',
  styleUrls: ['./timeline-ghost-container.component.scss']
})
export class TimelineGhostContainerComponent implements OnChanges {

  @Input() percentWidth: string = '0';
  @Input() percentMarginLeft: string = '0';

  @HostBinding('style.width') hostWidth: string;
  @HostBinding('style.margin-left') hostMarginLeft: string;

  constructor() { }

  ngOnChanges(): void {
    this.hostWidth = this.percentWidth;
    this.hostMarginLeft = this.percentMarginLeft;
  }

}
