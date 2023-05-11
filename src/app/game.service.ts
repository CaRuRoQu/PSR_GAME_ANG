import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  public cards = [
    { image: '../../../assets/Bilder/Stein-2.png', alt: 'Stone', value: 'A' },
    { image: '../../../assets/Bilder/Papier-2.png', alt: 'Paper', value: 'B' },
    { image: '../../../assets/Bilder/Schere-2.png', alt: 'Scissors', value: 'C' }
  ];

  public cardsAnimated = [
      { image: '../../../assets/Gifs/Stein.gif', alt: 'Stone', value: 'A' },
      { image: '../../../assets/Gifs/Papier.gif', alt: 'Paper', value: 'B' },
      { image: '../../../assets/Gifs/Schere.gif', alt: 'Scissors', value: 'C' }
    ];

  /**
     * Checks if the game has ended based on the player's score.
     * @param playerScore The player's score.
     * @returns True if the game has ended, false otherwise.
     */

  public checkEndGame(playerScore: number): boolean {
    return playerScore < 0;
  }

  /**
   * Updates the high score if the current score is higher.
   * @param score The current score.
   * @param highScore The current high score.
   * @returns The updated high score.
   */
  public updateHighScore(score: number, highScore: number): number {
    if (score > highScore) {
      return score;
    } else {
      return highScore;
    }
  }

  /**
   * Generates a random move for the computer.
   * @returns The computer's move (A, B, or C).
   */

  public computerSelection(): string {
    // Logic for the computer to select a move
    const options = ['A', 'B', 'C'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  /**
   * Determines the winner of the rock-paper-scissors game.
   * @param player The player's move (A, B, or C).
   * @param computer The computer's move (A, B, or C).
   * @returns The result of the game: 'W' for player wins, 'L' for computer wins, 'T' for a tie.
   */

  public rockPaperScissors(player: string, computer: string): string {
    // Logic for determining the winner
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

  /**
   * Converts a move string (A, B, or C) to its corresponding number index.
   * @param str The move string (A, B, or C).
   * @returns The number index of the move.
   * @throws Error if the input is invalid.
   */

  public convertToNumber(str: string): number {
    // Logic for converting a string to a number
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

  // Add more funtions if needed! Call them on the game component.

  // Other GameService properties and methods...

  public getCardsAnimated(): any[] {
    return this.cardsAnimated;
  }

  public getCards(): any[] {
    return this.cards;
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
              <svg class="fill-current text-cyan-950" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M18 1.5l-1.5-1.5-7.5 7.5-7.5-7.5-1.5 1.5 7.5 7.5-7.5 7.5 1.5 1.5 7.5-7.5 7.5 7.5 1.5-1.5-7.5-7.5z"/>
              </svg>
            </div>
          </div>
          <div class="text-center">
            <button class="bg-cyan-800 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
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

}
