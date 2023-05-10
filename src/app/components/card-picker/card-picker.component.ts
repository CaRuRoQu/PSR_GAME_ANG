import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-picker',
  templateUrl: './card-picker.component.html',
  styleUrls: ['./card-picker.component.css']
})
export class CardPickerComponent {
  cards = [
    { image: '../../../assets/Stein-1.png', alt: 'Stone', value: 'A' },
    { image: '../../../assets/Papier-1.png', alt: 'Paper', value: 'B' },
    { image: '../../../assets/Schere-1.png', alt: 'Scissors', value: 'C' }
    
  ];

  selected: any = null;
  @Output() selectionMade = new EventEmitter<string>();  

// Function the sends a leter depending on selection. @ToDo Need to deactivate if nothing is selected.
  submitSelection() {
    if (this.selected) {
      const selectedCard = this.selected.value;
      // console.log(selectedCard);
     
      this.selectionMade.emit(selectedCard);
      this.selected = null;
    }
  }  
}