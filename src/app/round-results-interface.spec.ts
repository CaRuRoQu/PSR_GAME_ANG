import { RoundResults } from './round-results-interface';

describe('GameDataInterface', () => {
  it('should define the correct properties', () => {
    const roundResults: RoundResults = {
      headerText: 'string',
      firstImage: 'string',
      // firstStatus: false,
      secondImage: 'string',
      // secondStatus: true
    };

    expect(roundResults).toBeDefined();
    expect(roundResults.headerText).toBe('string');
    expect(roundResults.firstImage).toBe('string');
    // expect(roundResults.firstStatus).toBe(false);
    expect(roundResults.secondImage).toBe('string');
    // expect(roundResults.secondStatus).toBe(true);
  });
});



