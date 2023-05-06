import { Component, Input } from '@angular/core';

interface GameData {
  round: number;
  level: number;
  points: number;
  highScore: number;
  
}

@Component({
  selector: 'app-game-data',
  templateUrl: './game-data.component.html',
  styleUrls: ['./game-data.component.css']
})
export class CardActionComponent {
  @Input() gameData!: GameData;

  constructor() { }

  runSomething(): void {
    console.log('test');
    console.log('data', this.gameData);
  }

  ngOnInit(): void {
    this.runSomething();
  }
}
