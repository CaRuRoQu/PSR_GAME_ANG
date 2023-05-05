import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-line',
  templateUrl: './horizontal-line.component.html',
  styleUrls: ['./horizontal-line.component.css'],
  styles: []

})
export class HorizontalLineComponent {
  numbers: number[] = [-3, -2, -1, 0, 1, 2, 3];
  @Input() horizontalStatus!:number;

}

