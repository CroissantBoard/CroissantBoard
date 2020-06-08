import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotificationService } from 'src/app/shared/services/notification.service';

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

  constructor(private notificationService: NotificationService) { }

  onHourPicked(hour: number) {
    this.hourPickedEvent.emit(hour);

    const message = `Selected time: ${formatTime(hour)}`;
    this.notificationService.openSnackBar(message);
  }
  
  formatTime(num: number): string {
    return formatTime(num);
  }

}
