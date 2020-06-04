import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import IProject from 'src/app/shared/interfaces/Project';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {
  project: IProject;

  constructor(
    private projectsService: ProjectService,
    private dialogRef: MatDialogRef<DeleteProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IProject) {}

  ngOnInit(): void {
    this.project = this.data;
  }

  deleteProject(): void {
    this.projectsService.deleteProject(this.project);
    this.dialogRef.close();
  }

  handleCancel():void {
    this.dialogRef.close();
  }
}
