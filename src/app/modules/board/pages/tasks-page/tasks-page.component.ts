import { Component, OnInit, Input } from '@angular/core';
import Task from 'src/app/shared/interfaces/Task';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  tasks: Task[];
  @Input() task: Task;
  isShown: boolean = false;
  editShown: boolean = false;
  showTaskList: boolean = true;
  oneTask
  sortVal

  constructor(private authService: AuthService, private taskService: TaskService) { }

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

  pickSortVal(data) {
    this.sortVal = data;
    return this.sortVal
  }

  showTasks() {
    this.showTaskList = !this.showTaskList;
  }
}
