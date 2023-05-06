import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface GameData {
  round: number;
  level: number;
  points: number;
  highScore: number;
}

interface RoundResults {
  headerText: string;
  firstImage: string;
  firstStatus: boolean;
  secondImage: string;
  secondStatus: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {
  gameData: GameData = { round: 1, level: 1, points: 0 , highScore: 0 };
  roundResults: RoundResults = { headerText: '', firstImage: '', secondImage: '', firstStatus: false, secondStatus: false };
  @Input() horizontalStatus: number = 0;
  @Input() gameLost: boolean = false;
  // @Input() gameOver: boolean = false;

  

  // Function for the computer to select a move

  computerSelection() {
    const options = ['A', 'B', 'C'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
  
// Function to find out who wins.
  rockPaperScissors(player: string, computer: string): string {
    if (player === computer) {

      return "T";
    } else if (
      (player === 'A' && computer === 'C') ||
      (player === 'B' && computer === 'A') ||
      (player === 'C' && computer === 'B')
    ) {
      return "W";
    } else {
      return "L";
    }
  }


   convertToNumber(str: string): number {
    switch (str) {
      case 'A':
        return 0;
      case 'B':
        return 1;
      case 'C':
        return 2;
      default:
        throw new Error(`Invalid input: ${str}`);
    }
  }

  getAnimations(result: string, playerOne: string, computer: string) {
  
    switch (result) {
      case 'W':
        this.roundResults.headerText = "Player wins!";
        this.roundResults.firstImage = this.cardsAnimated[this.convertToNumber(playerOne)].image;
        this.roundResults.secondImage = this.cards[this.convertToNumber(computer)].image;
        this.gameData.points = this.gameData.points + (5 * this.gameData.level);
        if (this.horizontalStatus < 3) {  this.horizontalStatus++; }

        break;
      case 'L':
        this.roundResults.headerText = "Computer wins!";
        this.roundResults.firstImage = this.cards[this.convertToNumber(playerOne)].image;
        this.roundResults.secondImage = this.cardsAnimated[this.convertToNumber(computer)].image;
        this.gameData.points = this.gameData.points - (10 * this.gameData.level);
        if (this.horizontalStatus  > -3) {  this.horizontalStatus--; }
        break;
      case 'T':
        this.roundResults.headerText = "It's a tie!";
        this.roundResults.firstImage = this.cards[this.convertToNumber(playerOne)].image;
        this.roundResults.secondImage = this.cards[this.convertToNumber(computer)].image;
        this.gameData.points = this.gameData.points + (5 * this.gameData.level) ;
        break;
      default:
        throw new Error(`Invalid result: ${result}`);
    } 

  } 
  
  // A diferent way to return true or false.
  
  checkEndGame(playerScore: number): boolean {
    return playerScore < 0;
  }

  roundWonOrLost(text: string) {
    const modal = document.createElement('div');
    modal.classList.add('fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center');
  
    modal.innerHTML = `
      <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div class="modal-content py-4 text-left px-6">
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">${text}</p>
            <div class="modal-close cursor-pointer z-50">
              <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M18 1.5l-1.5-1.5-7.5 7.5-7.5-7.5-1.5 1.5 7.5 7.5-7.5 7.5 1.5 1.5 7.5-7.5 7.5 7.5 1.5-1.5-7.5-7.5z"/>
              </svg>
            </div>
          </div>
          <div class="text-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              OK
            </button>
          </div>
        </div>
      </div>
    `;
  
    document.body.appendChild(modal);
  
    const closeButton = modal.querySelector('.modal-close');
    closeButton?.addEventListener('click', () => {
      modal.remove();
    });
  
    const okButton = modal.querySelector('.modal-content button');
    okButton?.addEventListener('click', () => {
      modal.remove();
    });
  }
  

  checkLevelStatus(): string {
    if (this.horizontalStatus === -3) {
      // take 30 point away.
      this.gameData.points = this.gameData.points - (30 * this.gameData.level);
      this.horizontalStatus = 0;
      this.gameData.round = 0;
      this.roundWonOrLost("Unfortunately, you have lost this level. You will lose " + (30 * this.gameData.level) + " points. Better luck next time!");

      return 'l'; // player lost the round
    } else if (this.horizontalStatus === 3) {
      // Add 30 points to his score and move to next round.
      this.gameData.points = this.gameData.points +  (50 * this.gameData.level);
      this.horizontalStatus = 0;      
      this.gameData.round = 0;
      this.roundWonOrLost("You have won this level! Congratulations! You will now proceed to the next level. You will receive " + (50 * this.gameData.level) + " points for your accomplishment.");
      this.gameData.level++;
      return 'w'; // player won the round
    } else {
      return 't'; // game continues.
    }
  }  

  updateHighScore(score: number, highScore: number): number {
    if (score > highScore) {
      return score;
    } else {
      return highScore;
    }
  }  

  // Send the selection.s
  handleSelection($event: any): void {

    const computermove = this.computerSelection();
    this.gameData.round++;
    const playermove = $event;
    console.log('Emmited', $event);
    // this should return w, l, t,

    // const headerText[] = [''}
    const winner = this.rockPaperScissors(playermove, computermove);

    this.getAnimations(winner, playermove, computermove);

    // console.log('playermove',playermove ,'computermove',computermove , 'winner', winner); 
    
    const levelStaus = this.checkLevelStatus();
    this.gameData.highScore = this.updateHighScore(this.gameData.highScore, this.gameData.points);

    this.gameLost = this.checkEndGame(this.gameData.points);

    // console.log('gameData', this.gameData.points);
  }  



    SaveGame($gameData: any): void {
      console.log('$gameData', $gameData);

      // Send the data to the database. and quit

      this.router.navigate(['/']);
    }

 
    
    SaveAndPlayAgain($gameData: any): void {
      console.log('$gameData', $gameData);
      // Send the data to the database. and restart.
      const gameRestart = this.setgameData();
    } 

  // Set the game Data properties
  setgameData(): void {
    this.gameData.level = 1;
    this.gameData.round = 0;
    this.gameData.points = 100;
    this.gameData.highScore = 0;
    this.horizontalStatus = 0 ;
    this.roundResults.firstImage = '';
    this.roundResults.secondImage = '';
    this.roundResults.headerText = "";
    this.gameLost = false;
  }

  cardsAnimated = [
    { image: '../../../assets/Gifs/Stein.gif', alt: 'Stone', value: 'A' },
    { image: '../../../assets/Gifs/Papier.gif', alt: 'Paper', value: 'B' },
    { image: '../../../assets/Gifs/Schere.gif', alt: 'Scissors', value: 'C' }
  ];
  cards = [
    { image: '../../../assets/Bilder/Stein-2.png', alt: 'Stone', value: 'A' },
    { image: '../../../assets/Bilder/Papier-2.png', alt: 'Paper', value: 'B' },
    { image: '../../../assets/Bilder/Schere-2.png', alt: 'Scissors', value: 'C' }
  ];

 
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setgameData();

    // this.setRoundResults();
    // this.SetHorizontalStatus();
  }
}
