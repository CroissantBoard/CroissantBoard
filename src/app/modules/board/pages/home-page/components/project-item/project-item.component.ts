import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import IProject from 'src/app/shared/interfaces/Project';
import User from 'src/app/shared/interfaces/User';
import { DeleteProjectComponent } from 'src/app/modules/board/pages/home-page/components/delete-project/delete-project.component';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  isUserAuthor = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isUserAuthor = this.checkAuthor(this.user, this.project);
  }

  @Input() project: IProject;
  @Input() user: User;
  @Output() toggleForm = new EventEmitter();


  editProject(project: IProject): void {
    this.toggleForm.emit(project);
  }

  openDialog(project: IProject): void {
    this.dialog.open(DeleteProjectComponent, {
      width: '500px',
      data: project,
    });
  }

  private checkAuthor(user: User, project: IProject): boolean {
    return user.uid === project.createdBy;
  }
}
