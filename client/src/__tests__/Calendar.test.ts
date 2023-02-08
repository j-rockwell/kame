import {getDaysUntilWeekStart} from "../data/Calendar";

describe('Calendar ->', () => {
  it('getDaysUntilWeekStart ->', () => {
    const mon = getDaysUntilWeekStart(2, 0, 2023);
    const wed = getDaysUntilWeekStart(4, 0, 2023);
    const fri = getDaysUntilWeekStart(6, 0, 2023);

    expect(mon).toEqual(7);
    expect(wed).toEqual(5);
    expect(fri).toEqual(3);
  });
});