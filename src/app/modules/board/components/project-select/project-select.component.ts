import { Component, OnInit, Input } from '@angular/core';

import { ProjectService } from 'src/app/shared/services/project.service';
import User from 'src/app/shared/interfaces/User';
import { IProjectShort, IProject } from 'src/app/shared/interfaces/Project';

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.scss']
})
export class ProjectSelectComponent implements OnInit {
  selected: IProjectShort;
  selectedShot: string;

  @Input() showSidebar: boolean;
  @Input() user: User;
  @Input() projects: IProject[];

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.selected = this.projects[0];
    this.selectedShot = this.getTitle(this.selected.name);
    this.projectService.setCurrentProject(this.selected);
  }

  onChange(selected: IProject): void {
    this.projectService.setCurrentProject(selected);
    this.selectedShot = this.getTitle(selected.name);
  }

  private getTitle(val: string): string {
    const valueArr = val.split(' ');

    if (valueArr.length > 1) {
      return valueArr[0][0].toUpperCase() + valueArr[1][0].toUpperCase();
    }

    return valueArr[0][0].toUpperCase()
  }
}
