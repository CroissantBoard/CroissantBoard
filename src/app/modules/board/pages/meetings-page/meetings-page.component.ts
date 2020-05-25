import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit {

  timelineRuler = new Array(24).fill(null);

  allTimelines = [
    { addingDropListId: 'addingDropListId_0' },
    { addingDropListId: 'addingDropListId_1' },
    { addingDropListId: 'addingDropListId_2' },
  ];

  timelineBarId: string = 'addingItemsList';

  constructor() { }

  ngOnInit(): void {
  }

}
