import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import User from 'src/app/shared/interfaces/User';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import Task from 'src/app/shared/interfaces/Task';
import * as moment from 'moment';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';
import IProject from 'src/app/shared/interfaces/Project';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss',
    '../../tasks-page.component.scss']
})
export class TaskEditComponent implements OnInit, OnChanges {

  isPublic: boolean = false;
  user$: Observable<User>;
  user: User;
  users;
  form: FormGroup;
  minDate: Date;
  projects;
  project: IProject;
  @Input() task: Task;
  @Output() edited = new EventEmitter();
  @Output() isShown = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService,
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      deadline: new FormControl('', [
        Validators.required
      ]),
      priority: 'low',
      description: '',
      assignee: '',
      project: new FormControl('', [
        Validators.required
      ]),
      completed: false,
      IsPrivate: true,
    });
    this.minDate = new Date();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.user$.subscribe(user => {
        this.user = user;
        this.projectService.getProjectsByUserId(this.user.uid).subscribe(projects => this.projects = projects);
        this.projectService.getCurrentProject().subscribe(project => {
          this.project = project
          this.userService.getUsersByProject(this.project.uid).subscribe(users => this.users = users);
        })
      });
    }, 300);
  }

  ngOnChanges() {
    this.form.setValue({
      name: this.task.name,
      deadline: moment(new Date(this.task.deadline)).format('YYYY-MM-DD'),
      priority: this.task.priority,
      description: this.task.description,
      assignee: this.task.assignee,
      project: this.task.projectFull,
      completed: this.task.completed,
      IsPrivate: this.task.IsPrivate,
    });
    this.isPublic = this.task.IsPrivate ? true : false;
  }

  updateItem(task: Task, edit) {
    if (this.form.valid) {
      const formData = { ...this.form.value };
    }

    if ((this.form.value.name || '').trim()) {
      edit.deadline = new Date(edit.deadline).getTime()
      edit.projectFull = this.form.value.project
      edit.project = edit.projectFull.name;
      edit.projectId = edit.projectFull.uid;
      this.taskService.updateTask(this.task.id, edit);
      this.closeWindow();
    }

    this.form.controls['name'].setValue(this.form.value.name.trim());
  }

  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched);
  }

  deleteTask(event, task: Task) {
    this.taskService.deleteTask(task);
    this.closeWindow();
  }

  closeWindow() {
    this.isShown.emit();
  }

  togglePublic() {
    this.isPublic = !this.isPublic;
  }
}
