import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import User from 'src/app/shared/interfaces/User';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import Task from 'src/app/shared/interfaces/Task';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss',
    '../../tasks-page.component.scss']
})
export class TaskAddComponent implements OnInit {

  task: Task = {}
  user$: Observable<User>;
  user: User;
  form: FormGroup;
  @Output() isShown = new EventEmitter<boolean>();
  @Output() added = new EventEmitter();

  minDate: Date;
  current = new Date();
  followingDay = +(new Date(this.current.getTime() + 86400000));
  isAdd: boolean = true;
  isPublic: boolean = false;
  projects;
  project;
  users;

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
      projectFull: '',
      project: new FormControl('', [
        Validators.required
      ]),
      projectId: '',
      completed: false,
      IsPrivate: true,
    });
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.user = user);
    setTimeout(() => {
      this.projectService.getProjectsByUserId(this.user.uid).subscribe(projects => this.projects = projects)
      this.projectService.getCurrentProject().subscribe(project => this.project = project)
      this.userService.getUsersByProject(this.project.uid).subscribe(users => this.users = users);
    }, 300);
  }

  onSubmit({ name, deadline, priority, description, assignee, project, completed, IsPrivate }): void {
    if (this.form.valid) {
      const formData = { ...this.form.value };
    }

    if (this.form.value.name.trim() == '') {
      this.form.controls['name'].setValue(this.form.value.name.trim());
    } else {
      this.form.controls['name'].setErrors(null);
    }

    if ((this.form.value.name || '').trim()) {
      this.taskService.addTask({
        name,
        deadline: new Date(deadline).getTime(),
        priority,
        dateOfCreate: Date.now(),
        createdBy: this.user.uid,
        completed,
        description,
        assignee,
        projectFull: this.form.value.project,
        project: this.form.value.project.name,
        projectId: this.form.value.project.uid,
        IsPrivate
      })
      this.form.reset();
      this.form.controls['priority'].setValue('low')
      this.form.controls['deadline'].setErrors(null);
      this.form.controls['project'].setErrors(null);
      this.closeWindow();
    }
    this.added.emit();
  }

  closeWindow() {
    this.isShown.emit();
  }

  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched);
  }

  togglePublic() {
    this.isPublic = !this.isPublic;
  }
}
