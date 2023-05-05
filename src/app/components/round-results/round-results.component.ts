import { Component, Input } from '@angular/core';

interface GameData {
  round: number;
  level: number;
  points: number;
}

interface RoundResults {  
  headerText: string;  
  firstImage: string;  
  firstStatus: boolean; 
  secondImage: string; 
  secondStatus: boolean }

@Component({
  selector: 'app-round-results',
  templateUrl: './round-results.component.html',
  styleUrls: ['./round-results.component.css']
})


export class RoundResultsComponent {
  @Input() roundResults!: RoundResults;

  // cardsAnimated = [
  //   { image: '../../../assets/Gifs/Stein.gif', alt: 'Stone', value: 'A' },
  //   { image: '../../../assets/Gifs/Papier.gif', alt: 'Paper', value: 'B' },
  //   { image: '../../../assets/Gifs/Schere.gif', alt: 'Scissors', value: 'C' }
    
  // ];
  // cards = [
  //   { image: '../../../assets/Bilder/Stein-2.png', alt: 'Stone', value: 'A' },
  //   { image: '../../../assets/Bilder/Papier-2.png', alt: 'Paper', value: 'B' },
  //   { image: '../../../assets/Bilder/Schere-2.png', alt: 'Scissors', value: 'C' }
    
  // ];

 
  

} 



