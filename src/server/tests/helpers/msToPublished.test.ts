import { msToPublishedInfo } from '../../../utils/helpers-client';
import { describe } from 'mocha';
import { expect } from 'chai';

describe('msToPublishedInfo function', () => {
  it('Should return correct published info', () => {
    const cases = [
      { time: 2000, output: '2 seconds ago' },
      { time: 600000, output: '10 minutes ago' },
      { time: 3600000, output: '1 hour ago' },
      { time: 90000000, output: '1 day ago' },
      { time: 180000000, output: '2 days ago' },
      { time: 777600000, output: '1 week ago'}
    ];
    for (const { time, output } of cases) {
      expect(msToPublishedInfo(time)).to.eq(output);
    }
  });
});
