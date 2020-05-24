import { Component, OnInit, Input } from '@angular/core';
import Task from 'src/app/shared/interfaces/Task';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  @Input() task: Task;
  isShown: boolean = false;
  editShown: boolean = false;
  oneTask

  constructor() { }

  ngOnInit(): void { }

  showAddMenu(): void {
    this.editShown = false
    this.isShown = !this.isShown;
  }

  showEditMenu(): void {
    this.editShown = !this.editShown;
  }

  pasteTask(data, edit) {
    this.isShown = false
    this.oneTask = data
    this.editShown = edit;
  }
}
