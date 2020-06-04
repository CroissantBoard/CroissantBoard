import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ProjectService } from 'src/app/shared/services/project.service';
import User from 'src/app/shared/interfaces/User';
import IProject from 'src/app/shared/interfaces/Project';
import { COLORS } from 'src/app/shared/components/avatar/colors';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  valid = false;
  submitted = false;
  user: User;
  colors = COLORS;
  selected = COLORS[0];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
  ) { }

  @Output() toggleEditForm = new EventEmitter();
  @Input() project: IProject;

  ngOnInit(): void {
    this.selected = this.project.iconColor;
    this.projectForm = this.formBuilder.group({
      name: new FormControl(this.project.name, [
        Validators.required,
      ]),
      iconColor: new FormControl(this.project.iconColor)
    })
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    this.valid = true;

    const project = {
      ...this.project,
      ...this.projectForm.value,
    }

    // this.projectService.addProject(project)
    //   .then(docRef => {
  
    //   })
  
    // this.toggleEditForm.emit();
  }

  close(): void {
    this.toggleEditForm.emit(null);
  }
}
