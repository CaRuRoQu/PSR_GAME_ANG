import { GameData } from './game-data-interface';

describe('GameDataInterface', () => {
  it('should define the correct properties', () => {
    const gameData: GameData = {
      round: 1,
      level: 1,
      points: 0,
      highScore: 0
    };

    expect(gameData).toBeDefined();
    expect(gameData.round).toBe(1);
    expect(gameData.level).toBe(1);
    expect(gameData.points).toBe(0);
    expect(gameData.highScore).toBe(0);
  });
});
