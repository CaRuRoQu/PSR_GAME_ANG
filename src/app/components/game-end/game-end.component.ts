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
  @Input()
  userName!: string;

  @Output() saveAndPlayAgain =  new EventEmitter<string>();  
  @Output() retry = new EventEmitter<void>();  

  onSave() {     
      this.saveAndPlayAgain.emit(this.userName);
  }

  onRetry() {
    this.retry.emit();
  }
}
