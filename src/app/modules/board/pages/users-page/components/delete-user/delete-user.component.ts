import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import User from 'src/app/shared/interfaces/User';
import IProject from 'src/app/shared/interfaces/Project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  user: User;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: User) {}

  ngOnInit(): void {
    this.user = this.data;
  }

  handelRemove():void {
    this.projectService.currentProject$
      .subscribe((project: IProject) => {
        this.userService.removeUserFromProject(this.user, project.uid);
      });

    this.projectService.removeParticipant(this.user.uid);
    this.dialogRef.close();
  }


  handleCancel():void {
    this.dialogRef.close();
  }
}
