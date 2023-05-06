import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.css']
})
export class GameEndComponent {
  @Input()
  highScore!: number;
  @Input()
  level!: number;
  @Output() saveAndPlayAgain = new EventEmitter<void>();
  @Output() saveAndExit = new EventEmitter<void>();
  playerName = '';

  onSaveAndPlayAgain() {
    this.saveAndPlayAgain.emit();
  }

  onSaveAndExit() {
    this.saveAndExit.emit();
  }
}
