import { Component, OnInit, Input } from '@angular/core';
import IProject from 'src/app/shared/interfaces/Project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { User } from 'firebase';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  isUserAuthor = false;

  constructor(
    private projectsService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.isUserAuthor = this.checkAuthor(this.user, this.project);
  }

  @Input() project: IProject;
  @Input() user: User;

  //temp button
  deleteProject(project: IProject): void {
    this.projectsService.deleteProject(project);
  }

  private checkAuthor(user: User, project: IProject): boolean {
    return user.uid === project.createdBy;
  }
}
