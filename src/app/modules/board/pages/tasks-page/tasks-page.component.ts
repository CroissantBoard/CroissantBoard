import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import Task from 'src/app/shared/interfaces/Task';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { switchMap, takeUntil, take } from 'rxjs/operators';
import { ProjectService } from 'src/app/shared/services/project.service';
import IProject from 'src/app/shared/interfaces/Project';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  tasks: Task[];
  @Input() task: Task;
  isShown: boolean = false;
  editShown: boolean = false;
  showTaskList: boolean = true;
  oneTask
  sortVal: string;
  filter: string;
  isLoading: boolean = true;
  project: IProject;

  constructor(private router: Router, private taskService: TaskService, private projectService: ProjectService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.projectService.getCurrentProject()
        .pipe(takeUntil(this.destroy$))
        .subscribe(project => {
          if (!project) {
            this.router.navigate(['/board/home']);
            return;
          }
          this.project = project;
          if (!this.isLoading && this.project && project.uid !== this.project.uid) this.isLoading = true;

          this.taskService.getTasksByProject(this.project.uid)
            .pipe(takeUntil(this.destroy$))
            .subscribe(tasks => this.tasks = tasks)
        });
      this.fetchTasks();
    }, 1000)
  }

  fetchTasks(): void {
    this.taskService.getTasksByProject(this.project.uid).pipe(
      take(1)
    ).subscribe(tasks => {
      this.tasks = tasks;
      if (this.isLoading) this.isLoading = false;
    })
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
