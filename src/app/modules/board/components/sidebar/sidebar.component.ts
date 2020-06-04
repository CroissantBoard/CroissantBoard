import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentification/auth.service';
import User from 'src/app/shared/interfaces/User';
import { ProjectService } from 'src/app/shared/services/project.service';
import IProject from 'src/app/shared/interfaces/Project';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: User;
  loading = true;
  projects: IProject[] = [];

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
     this.authService.user$
      .subscribe((user) => {
        this.user = user;
        this.projectService.getProjectsByUserId(user.uid)
          .subscribe((data) => {
            this.projects = data;
            this.loading = false;
          })
      })
  }

  @Input() showSidebar: boolean;
  @Input() isDesktop: boolean;
  @Output() toggleSidebar = new EventEmitter();

  hideSidebarForMobile(): void {
    if (!this.isDesktop) {
      this.toggleSidebar.emit();
    }
  }

  hideSidebar(): void {
    this.toggleSidebar.emit();
  }
}
