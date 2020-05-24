import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import User from 'src/app/shared/interfaces/User';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import Task from 'src/app/shared/interfaces/Task';
import * as moment from 'moment';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  isPublic: boolean = false;
  user$: Observable<User>;
  user: User;
  @Input() task: Task;
  @Output() edited = new EventEmitter();
  @Output() isShown = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  updateItem(task: Task) {
    this.taskService.updateTask(task);
  }

  deleteTask(event, task: Task) {
    this.taskService.deleteTask(task);
    this.closeWindow();
  }

  closeWindow() {
    this.isShown.emit();
  }

  test(){
    this.isPublic = !this.isPublic;
  }
}
