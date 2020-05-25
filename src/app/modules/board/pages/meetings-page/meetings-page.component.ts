import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit {

  timelineRows = new Array(24).fill(null);

  constructor() { }

  ngOnInit(): void {
  }

}
