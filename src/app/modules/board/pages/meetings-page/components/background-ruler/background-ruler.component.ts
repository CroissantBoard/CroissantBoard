import { Component, OnChanges, Input } from '@angular/core';

import generateRange from 'src/app/shared/helpers/generateRange';

@Component({
  selector: 'app-background-ruler',
  templateUrl: './background-ruler.component.html',
  styleUrls: ['./background-ruler.component.scss']
})
export class BackgroundRulerComponent implements OnChanges {

  ruler: number[] = [];

  @Input() length: number = 0;

  constructor() { }

  ngOnChanges(): void {
    if (this.length) {
      this.ruler = generateRange(0, this.length - 1);
    }
  }

}
