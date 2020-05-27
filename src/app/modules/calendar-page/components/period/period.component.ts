import { DateService } from '../../services/date.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent {

  constructor(public dateService: DateService) { }

  slide(dir: number) {
    this.dateService.switchMonth(dir)
  }
  
}
