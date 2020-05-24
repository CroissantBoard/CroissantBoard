import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Task from 'src/app/shared/interfaces/Task';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  isEdit: boolean = false;
  @Output() editShown = new EventEmitter<boolean>();
  @Output() oneTask = new EventEmitter();

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        switchMap((user) => {
          return this.taskService.getTasks(user.uid);
        })
      )
      .subscribe((tasks) => {
        return this.tasks = tasks;
      });

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  editTask(event, task: Task) {
    this.editShown.emit(true);
    this.oneTask.emit(task);
  }
}
