import { Component, Input, OnInit } from '@angular/core';

import { COLORS } from './colors';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  title: string;

  @Input() name: string;
  @Input() iconColor: string;

  constructor() {
  }

  ngOnInit() {
    this.title = this.getTitle(this.name);

    if (!this.iconColor) this.iconColor = this.getColor();
  }

  private getTitle(val: string): string {
    const valueArr = val.split(' ');

    if (valueArr.length > 1) {
      return valueArr[0][0].toUpperCase() + valueArr[1][0].toUpperCase();
    }

    return valueArr[0][0].toUpperCase()
  }

  getColor(): string {
    return COLORS[this.getRandomInt(0, COLORS.length)]
  }

  private getRandomInt(min = 0, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
