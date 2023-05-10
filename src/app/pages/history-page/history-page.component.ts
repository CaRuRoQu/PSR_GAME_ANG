import { Component, Input } from '@angular/core';
import { GamedataService } from '../../services/gamedata.service';


interface GamedataArray {
  id: BigInteger;
  name: string;
  level: number;
  highScore: number;
  playedOn:string;
  
}

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {

  @Input()
  gamedataArray: GamedataArray[] = [];
 

  constructor(private gamedataService: GamedataService){}
    // GamedataArray

    formatDate(dateString: string): string {
      const date = new Date(dateString);
      if (Object.prototype.toString.call(date) === "[object Date]") {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      } else {
        return dateString;
      }
    }    

    ngOnInit() {
      this.gamedataService.getAllGameRecords().subscribe((data: GamedataArray[]) => {
        this.gamedataArray = data;
        console.log('gamedataService data',data);
      });
    }
}