import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { IProjectShort, IProject } from 'src/app/shared/interfaces/Project'
import { AuthService } from 'src/app/core/authentification/auth.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: IProject[] = [];
  loading = true;
  showForm = false;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit(): void {
    this.authService.user$
      .subscribe((user) => {
        this.projectService.getProjectsByUserId(user.uid)
          .subscribe((data) => this.projects = data)

        this.loading = false;
      })
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
