import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Task from 'src/app/shared/interfaces/Task';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProjectService } from 'src/app/shared/services/project.service';

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
  @Input() sortVal;
  @Input() filter;
  sortPriorVal = 'asc';
  project
  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.projectService.getCurrentProject().subscribe(project => this.project = project)
    this.authService.user$
      .pipe(switchMap(user => this.taskService.getTasks(user.uid)))
      .subscribe(tasks => this.tasks = tasks.filter(task => this.project.uid == task.project));
    this.filter = 'all';
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  editTask(event, task: Task) {
    this.editShown.emit(true);
    this.oneTask.emit(task);
  }

  todosFiltered(): Task[] {
    if (this.filter === 'all') {
      return this.tasks
    } else if (this.filter === 'active') {
      return this.tasks.filter(todo => !todo.completed)
    } else if (this.filter === 'completed') {
      return this.tasks.filter(todo => todo.completed)
    }
    return this.tasks
  }
}
