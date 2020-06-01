import { Component, OnInit, Input } from '@angular/core';
import { IProjectShort } from 'src/app/shared/interfaces/Project';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  constructor(
    private projectsService: ProjectService,
  ) { }

  ngOnInit(): void {
  }

  @Input() project: IProjectShort;

  //temp button
  deleteProject(uid: string): void {
    this.projectsService.deleteProject(uid);
  }
}
