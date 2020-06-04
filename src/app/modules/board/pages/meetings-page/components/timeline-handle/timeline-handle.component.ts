import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-handle',
  templateUrl: './timeline-handle.component.html',
  styleUrls: ['./timeline-handle.component.scss']
})
export class TimelineHandleComponent implements OnInit {

  @Input() isLeft: boolean = false;
  @Input() isRight: boolean = false;
  @Input() isSwap: boolean = false;
  @Input() isAdd: boolean = false;

  @Input() isMoving: boolean = false;
  @Input() isHidden: boolean = false;
  
  @Input() status: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
