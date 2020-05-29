import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import Task from 'src/app/shared/interfaces/Task';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit, OnChanges {
  @Output() sortVal = new EventEmitter();
  @Output() filter = new EventEmitter<string>();
  @Input() tasks: Task[];
  count

  constructor() { }

  ngOnInit(): void { 
  }

  ngOnChanges() {
    this.remaining();
  }

  sortByCategories(event) {
    this.sortVal.emit((<HTMLInputElement>event.target).value);
  }

  filterItems(event) {
    this.filter.emit((<HTMLInputElement>event.target).value);
  }

  remaining() {
    this.count = this.tasks.filter(todo => !todo.completed).length;
  }
}
