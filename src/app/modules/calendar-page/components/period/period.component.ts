import { DateService } from '../../services/date.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent {

  constructor(
    public dateService: DateService,
    public router: Router
    ) { }

  slide(dir: number) {
    this.dateService.switchMonth(dir)
  }

  gotoTask() {
    this.router.navigate(['/board/tasks']);
  }
  
}
