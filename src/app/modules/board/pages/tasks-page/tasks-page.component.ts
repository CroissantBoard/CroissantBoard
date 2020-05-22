import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
 
  isShown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showAddMenu() {
    this.isShown = !this.isShown;
  }
}
