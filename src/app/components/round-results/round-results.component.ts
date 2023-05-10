import { Component, Input } from '@angular/core';

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

}