import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GamedataService } from '../../services/gamedata.service';
import { GameData } from '../../game-data-interface';
import { GamedataUpdate } from '../../game-data-update-interface';
import { RoundResults } from '../../round-results-interface';
import { GameService } from '../../game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent { 
  cardsAnimated: { image: string; alt: string; value: string; }[];
  cards: any;
  gameData: GameData = { round: 1, level: 1, points: 0 , highScore: 0 };
  roundResults: RoundResults = { headerText: '', firstImage: '', secondImage: '',};

  @Input() horizontalStatus: number = 0;
  @Input() gameLost: boolean = false;
  @Input()
  userName!: string;

  constructor(private router: Router, private gamedataService: GamedataService, private gameService: GameService) {
    this.cardsAnimated = gameService.cardsAnimated;
    this.cards = gameService.cards;
  }

  ngOnInit(): void {
    this.setGameData();
  }
    /**
     * Sets the initial game data and round results.
     */
    setGameData(): void {
      this.gameData.level = 1;
      this.gameData.round = 0;
      this.gameData.points = 50;
      this.gameData.highScore = this.gameData.points;
      this.horizontalStatus = 0;
      this.roundResults.firstImage = '';
      this.roundResults.secondImage = '';
      this.roundResults.headerText = "";
      this.gameLost = false;
    }

    /**
     * Restarts the game by resetting the game data and navigating to the game page.
     */
    retry(): void {
      this.setGameData();
      this.router.navigate(['/game']);
    }

    /**
     * Saves the game data, adds a game record, and restarts the game.
     * @param $event The name of the player.
     */

    saveAndPlayAgain($event: any): void {
      console.log('Emitted SaveAndPlayAgain', $event);
      const formattedGameData: GamedataUpdate = {
        name: $event,
        level: this.gameData.level,
        highScore: this.gameData.highScore,
        playedOn: new Date().toISOString(),
      };

      this.gamedataService.addGameRecord(formattedGameData).subscribe(() => {
        console.log('Game data added successfully.');
      });

      this.setGameData();
      this.router.navigate(['/game']);
    }

    /**
     * Updates the game animations and scores based on the result.
     * @param result The result of the game ('W' for win, 'L' for loss, 'T' for tie).
     * @param playerOne The player's move.
     * @param computer The computer's move.
     */

    getAnimations(result: string, playerOne: string, computer: string) {
      switch (result) {
        case 'W':
          this.roundResults.headerText = "Player wins!";
          this.roundResults.firstImage = this.cardsAnimated[this.gameService.convertToNumber(playerOne)].image;
          this.roundResults.secondImage = this.cards[this.gameService.convertToNumber(computer)].image;
          this.gameData.points = this.gameData.points + (5 * this.gameData.level);
          if (this.horizontalStatus < 3) {  this.horizontalStatus++; }
          break;
        case 'L':
          this.roundResults.headerText = "Computer wins!";
          this.roundResults.firstImage = this.cards[this.gameService.convertToNumber(playerOne)].image;
          this.roundResults.secondImage = this.cardsAnimated[this.gameService.convertToNumber(computer)].image;
          this.gameData.points = this.gameData.points - (10 * this.gameData.level);
          if (this.horizontalStatus  > -3) {  this.horizontalStatus--; }
          break;
        case 'T':
          this.roundResults.headerText = "It's a tie!";
          this.roundResults.firstImage = this.cards[this.gameService.convertToNumber(playerOne)].image;
          this.roundResults.secondImage = this.cards[this.gameService.convertToNumber(computer)].image;
          this.gameData.points = this.gameData.points + (5 * this.gameData.level);
          break;
        default:
          throw new Error(`Invalid result: ${result}`);
      }
    }

  // Send the selected card to the function.

  handleSelection($event: any): void {
    const computerMove = this.gameService.computerSelection();
    this.gameData.round++;

    const playerMove = $event;

    // Determine the winner
    const winner = this.gameService.rockPaperScissors(playerMove, computerMove);

    // Get animations and update game data
    this.getAnimations(winner, playerMove, computerMove);

    const levelStatus = this.checkLevelStatus();
    this.gameData.highScore = this.gameService.updateHighScore(this.gameData.highScore, this.gameData.points);

    this.gameLost = this.gameService.checkEndGame(this.gameData.points);
  }

  // It checks if the level should be deducted or advanced. Issue or deduct points is aplicable.

  checkLevelStatus(): string {
    if (this.horizontalStatus === -3) {
      // take 50 point away.
      this.gameData.points = this.gameData.points - (50 * this.gameData.level);
      this.horizontalStatus = 0;
      this.gameData.round = 0;
      this.gameService.roundWonOrLost("Unfortunately, you have lost this level. You will lose " + (30 * this.gameData.level) + " points. Better luck next time!");

      return 'l'; // player lost the round
    } else if (this.horizontalStatus === 3) {
      // Add 50 points to his score and move to next round.
      this.gameData.points = this.gameData.points +  (50 * this.gameData.level);
      this.horizontalStatus = 0;      
      this.gameData.round = 0;
      this.gameService.roundWonOrLost("You have won this level! Congratulations! You will now proceed to the next level. You will receive " + (50 * this.gameData.level) + " points for your accomplishment.");
      this.gameData.level++;
      return 'w'; // player won the round
    } else {
      return 't'; // game continues.
    }
  }
}