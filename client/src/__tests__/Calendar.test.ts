import {getDaysUntilWeekStart} from '../data/Calendar';

describe('Calendar ->', () => {
  it('getDaysUntilWeekStart ->', () => {
    const sun = getDaysUntilWeekStart(19, 1, 2023);
    const mon = getDaysUntilWeekStart(20, 1, 2023);
    const tue = getDaysUntilWeekStart(21, 1, 2023);
    const wed = getDaysUntilWeekStart(22, 1, 2023);
    const thu = getDaysUntilWeekStart(23, 1, 2023);
    const fri = getDaysUntilWeekStart(24, 1, 2023);
    const sat = getDaysUntilWeekStart(25, 1, 2023);

    expect(sun).toEqual(0);
    expect(mon).toEqual(1);
    expect(tue).toEqual(2);
    expect(wed).toEqual(3);
    expect(thu).toEqual(4);
    expect(fri).toEqual(5);
    expect(sat).toEqual(6);
  });
});
