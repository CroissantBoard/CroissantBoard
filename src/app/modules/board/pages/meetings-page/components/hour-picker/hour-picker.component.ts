import { Component, Input, Output, EventEmitter } from '@angular/core';

import formatTime from 'src/app/shared/helpers/formatTime';

@Component({
  selector: 'app-hour-picker',
  templateUrl: './hour-picker.component.html',
  styleUrls: ['./hour-picker.component.scss']
})
export class HourPickerComponent {

  @Input() hoursArray: number[] = [];
  @Input() pickedHour: number = 0;

  @Output() hourPickedEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  onHourPicked(hour: number) {
    this.hourPickedEvent.emit(hour);
  }
  
  formatTime(num: number): string {
    return formatTime(num);
  }

}
