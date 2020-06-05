import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import Task from 'src/app/shared/interfaces/Task';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss', '../tasks-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  task: Task;
  isPublic: boolean = false;
  user$: Observable<User>;
  user;
  users;
  projects;
  project;
  form: FormGroup;
  minDate: Date;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
      project: '',
      completed: false,
      IsPrivate: true,
    });
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.user = user);
    this.route.params.subscribe((params: Params) => this.taskService.getOneTask(params).subscribe(task => this.task = task));
    setTimeout(() => {
      this.projectService.getProjectsByUserId(this.user.uid).subscribe(projects=> this.projects = projects);
      this.projectService.getCurrentProject().subscribe(project => this.project = project)
      this.userService.getUsersByProject(this.project.uid).subscribe(users => this.users = users);
      this.form.setValue({
        name: this.task.name,
        deadline: moment(new Date(this.task.deadline)).format('YYYY-MM-DD'),
        priority: this.task.priority,
        description: this.task.description,
        assignee: this.task.assignee,
        project: this.task.project,
        completed: this.task.completed,
        IsPrivate: this.task.IsPrivate,
      });
      this.isPublic = this.task.IsPrivate ? true : false;
    }, 500)
  }

  updateItem(task: Task, edit) {
    if (this.form.valid) {
      const formData = { ...this.form.value };
    }
    if ((this.form.value.name || '').trim()) {
      edit.deadline = new Date(edit.deadline).getTime()
      this.taskService.updateTask(this.task.id, edit);
    }
    this.form.controls['name'].setValue(this.form.value.name.trim());
  }

  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched);
  }

  deleteTask(event, task: Task) {
    this.taskService.deleteTask(task);
    this.router.navigate(['/board/tasks']);
  }

  togglePublic() {
    this.isPublic = !this.isPublic;
  }
}
