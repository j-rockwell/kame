import {createQueryParams} from '../util/Query';

describe('Query ->', () => {
  it('createQueryParams ->', () => {
    const params: Map<string, string> = new Map([
      ['day', '1'],
      ['month', '1'],
      ['year', '2023'],
    ]);

    const result = createQueryParams(params);
    expect(result).toEqual('?day=1&month=1&year=2023');
  });
});
