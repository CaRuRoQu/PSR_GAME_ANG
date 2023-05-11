import { Component, Input } from '@angular/core';
import { RoundResults } from '../../round-results-interface';


@Component({
  selector: 'app-round-results',
  templateUrl: './round-results.component.html',
  styleUrls: ['./round-results.component.css']
})

export class RoundResultsComponent {
  @Input() roundResults!: RoundResults;

}