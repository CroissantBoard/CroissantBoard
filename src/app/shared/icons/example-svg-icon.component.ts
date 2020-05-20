import { Component } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './example-svg-icon.component.svg',
  styleUrls: ['./example-svg-icon.component.scss']
})
export class ExampleSvgIconComponent {
  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}