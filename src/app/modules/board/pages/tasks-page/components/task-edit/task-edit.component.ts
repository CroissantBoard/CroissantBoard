import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import User from 'src/app/shared/interfaces/User';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import Task from 'src/app/shared/interfaces/Task';
import * as moment from 'moment';

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
  form: FormGroup;
  minDate: Date;
  @Input() task: Task;
  @Output() edited = new EventEmitter();
  @Output() isShown = new EventEmitter<boolean>();

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

  ngOnChanges() {
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
    this.closeWindow();
  }

  closeWindow() {
    this.isShown.emit();
  }

  togglePublic() {
    this.isPublic = !this.isPublic;
  }
}
