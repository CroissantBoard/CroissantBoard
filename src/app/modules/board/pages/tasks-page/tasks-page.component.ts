import { Component, OnInit, Input } from '@angular/core';
import Task from 'src/app/shared/interfaces/Task';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from 'src/app/shared/services/project.service';

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
  sortVal: string;
  filter: string;

  constructor(private authService: AuthService, private taskService: TaskService, private projectService: ProjectService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.projectService.getCurrentProject()
      .subscribe(project => this.taskService.getTasksByProject(project.uid).subscribe(tasks => this.tasks = tasks));
    }, 1000)  
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
    return this.sortVal;
  }

  pickFilterVal(data) {
    this.filter = data;
    return this.filter;
  }

  showTasks() {
    this.showTaskList = !this.showTaskList;
  }
}
