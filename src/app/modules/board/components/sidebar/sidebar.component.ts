import { Component, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor() { }

  @Input() showSidebar = true;
  @Output() toggleSidebar = new EventEmitter();

  hideSidebar(): void {
    this.toggleSidebar.emit();
  }
}
