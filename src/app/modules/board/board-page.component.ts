import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  showSidebar: boolean;
  isDesktop: boolean;

  constructor() {}
  
  ngOnInit(): void {
    this.showSidebar = window.innerWidth > 600;
    this.isDesktop = window.innerWidth >= 600;
  }

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    const innerWidth: number = event.target.innerWidth;

    if(!this.isDesktop && (innerWidth < 600)) {
      this.showSidebar = false;
      this.isDesktop = false;
      return;
    }

    if(this.isDesktop && (innerWidth => 600)) {
      this.showSidebar = true;
      this.isDesktop = true;
    }
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
