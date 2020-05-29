import { Component, OnInit, Input } from '@angular/core';
import { IProjectShort } from 'src/app/shared/interfaces/Project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Input() project: IProjectShort;

}
