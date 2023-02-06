import {getDaysUntilStartOfWeek} from "../data/Calendar";

describe('Calendar ->', () => {
  it('getWeekStartGap# ->', () => {
    /*
        SUN | MON | TUE | WED | THU | FRI | SAT
        0     1     2     3     4     5     6

        MON (1) = 2, 3, 4, 5, 6, 0 (6)
        WED (3) = 4, 5, 6, 0 (4)
        FRI (5) = 6, 0 (2)
     */

    const mon = getDaysUntilStartOfWeek(1);
    const wed = getDaysUntilStartOfWeek(3);
    const fri = getDaysUntilStartOfWeek(5);

    expect(mon).toEqual(6);
    expect(wed).toEqual(4);
    expect(fri).toEqual(2);
  });
});