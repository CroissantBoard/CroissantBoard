import { DateService } from '../../services/date.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  form: FormGroup

  http: HttpClient

  constructor(public dateService:DateService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value
  }

  load(date: moment.Moment) {
    return this.http.get<[]>('')
  }

}
