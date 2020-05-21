import { Component } from '@angular/core';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent {
  showSidebar = true;

  constructor() { }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

}
