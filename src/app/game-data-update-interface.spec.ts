import { GamedataUpdate } from './game-data-update-interface';

describe('GameDataUpdateInterface', () => {
  it('should define the correct properties', () => {
    const gameDataUpdate: GamedataUpdate = {
      name: 'test',
      level: 10,
      highScore: 120,
      playedOn: 'a date string',
    };

    expect(gameDataUpdate).toBeDefined();
    expect(gameDataUpdate.name).toBe('test');
    expect(gameDataUpdate.level).toBe(10);
    expect(gameDataUpdate.highScore).toBe(120);
    expect(gameDataUpdate.playedOn).toBe('a date string');
  });
});


