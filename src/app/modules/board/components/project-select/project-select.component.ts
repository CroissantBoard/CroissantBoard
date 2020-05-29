import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from 'src/app/core/authentification/auth.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import User from 'src/app/shared/interfaces/User';
import { IProjectShort } from 'src/app/shared/interfaces/Project';

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.scss']
})
export class ProjectSelectComponent implements OnInit {
  loading = true;
  user: User;
  selected: IProjectShort;
  selectedShot: string;

  @Input() showSidebar: boolean;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.authService.user$
      .subscribe((user) => {
        this.user = user;
        this.loading = false;

        if(user.projects) {
          this.selected = user.projects[0];
          this.selectedShot = this.getTitle(this.selected.name);
        }
      })
  }

  private getTitle(val: string): string {
    const valueArr = val.split(' ');

    if (valueArr.length > 1) {
      return valueArr[0][0].toUpperCase() + valueArr[1][0].toUpperCase();
    }

    return valueArr[0][0].toUpperCase()
  }

}
