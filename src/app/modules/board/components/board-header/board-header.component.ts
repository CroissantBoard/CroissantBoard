import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { PAGE_TITLES } from './pages.titles';
import { AuthService } from 'src/app/core/authentification/auth.service';
import User from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {
  title: string;
  user: User;
  showSearch = false;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    ) {
      this.router.events.forEach((event) => {
        if(event instanceof NavigationEnd) {
          this.title = this.getCurrentPageTitle(event.url);
        }
      });
    }
    
    ngOnInit(): void {
      this.authService.user$
      .subscribe((user) => {
        this.user = user;
      })
    }
    
  @Input() showButton = true;
  @Output() toggleSidebar = new EventEmitter();

  hideSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  private getCurrentPageTitle(url: string): string {
    const routes = url.split('/');
    const title = routes[2].toUpperCase();

    return PAGE_TITLES[title];
  }
}
