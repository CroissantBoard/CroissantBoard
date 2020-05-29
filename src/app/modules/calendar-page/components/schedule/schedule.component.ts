import { DateService } from '../../services/date.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(public dateService:DateService) { }

  ngOnInit() {
    
  }

  load(date: moment.Moment) {
    return this.http.get<[]>('')
  }

}
