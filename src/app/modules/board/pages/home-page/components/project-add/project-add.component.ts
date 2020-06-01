import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/core/authentification/auth.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import User from 'src/app/shared/interfaces/User';
import { COLORS } from 'src/app/shared/components/avatar/colors';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  projectForm: FormGroup;
  valid = false;
  submitted = false;
  user: User;
  colors = COLORS;
  selected = COLORS[0];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private projectService: ProjectService,
    private userService: UserService,
  ) { }

  @Output() toggleForm = new EventEmitter();

  ngOnInit(): void {
    this.authService.user$
      .subscribe((user) => {
        this.user = user;
      })

    this.projectForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
      ]),
      iconColor: new FormControl(COLORS[3])
    })
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    this.valid = true;

    const project = {
      ...this.projectForm.value,
      participants: [
        this.user.uid,
      ]
    }

    this.projectService.addProject(project)
      .then(docRef => {
        const projectRef = (docRef) ? (docRef).id : '';
        this.userService.setNewProject(this.user, projectRef)
      })
  
    this.toggleForm.emit();
  }

  close(): void {
    this.toggleForm.emit();
  }

}
