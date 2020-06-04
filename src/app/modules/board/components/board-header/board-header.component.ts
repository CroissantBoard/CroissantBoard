import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { PAGE_TITLES } from './pages.titles';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {
  title: string;
  @Input() showButton = true;

  constructor(
    private router: Router,
  ) {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.title = this.getCurrentPageTitle(event.url);
      }
    });
  }

  ngOnInit(): void {
  }

  @Output() toggleSidebar = new EventEmitter();

  hideSidebar(): void {
    this.toggleSidebar.emit();
  }

  handleAddMenu(): void {
    
  }

  private getCurrentPageTitle(url: string): string {
    const routes = url.split('/');
    const title = routes[2].toUpperCase();

    return PAGE_TITLES[title];
  }
}
