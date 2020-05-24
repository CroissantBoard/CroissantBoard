import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Task from 'src/app/shared/interfaces/Task';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  isEditTaskOpen: boolean;
  editState: boolean;
  taskToEdit: Task;
  minDate: Date;

  constructor(private taskService: TaskService) {
    this.isEditTaskOpen = false;
    this.minDate = new Date();
    this.editState = false;
  }

  ngOnInit(): void { }

  doneEdit(task: Task) {
    this.taskService.updateTask(task);
  }
}

