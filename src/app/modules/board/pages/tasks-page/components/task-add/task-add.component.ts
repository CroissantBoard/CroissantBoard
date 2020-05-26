import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import User from 'src/app/shared/interfaces/User';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import Task from 'src/app/shared/interfaces/Task';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private taskService: TaskService
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
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  onSubmit({ name, deadline, priority, description, assignee, project, completed, IsPrivate }): void {
    if (this.form.valid) {
      const formData = { ...this.form.value };
    }

    if (this.task.name != '') {
      this.taskService.addTask({
        name,
        deadline: new Date(deadline).getTime(),
        priority,
        dateOfCreate: Date.now(),
        createdBy: this.user.uid,
        completed,
        description,
        assignee,
        project,
        IsPrivate
      })
    }

    this.added.emit();

    this.form.controls['name'].setValue('')
    this.form.controls['deadline'].setValue('')
    this.form.controls['completed'].setValue('')
    this.form.controls['assignee'].setValue('')
    this.form.controls['project'].setValue('')
    this.form.controls['description'].setValue('')
    this.form.controls['priority'].setValue('low')
    this.form.controls['name'].setErrors(null);
    this.form.controls['deadline'].setErrors(null);
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
