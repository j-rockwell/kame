/**
 * Collects and returns calendar data for the specified date and amount of days
 * @param day Day of the month
 * @param month Month of the year (monthIndex)
 * @param year Full Year (from date js obj)
 * @param amount Amount of days to collect
 */
export function getCalendarData(
  day: number,
  month: number,
  year: number,
  amount: number,
): MonthEntry[] {
  const date = new Date(year, month, day);
  const months = getMonthsAsArray();

  let currentMonthName = months[date.getMonth()];
  let currentDays: number[] = [];
  let result: MonthEntry[] = [];

  for (let i = 0; i < amount; i++) {
    date.setTime(date.getTime() + 86400 * 1000);

    // we've rolled over to the next month
    if (months[date.getMonth()] !== currentMonthName) {
      if (currentDays.length > 1) {
        result.push({
          name: currentMonthName,
          index: date.getMonth() - 1,
          dates: currentDays,
          year: date.getFullYear(),
        });
      }

      currentDays = [];
      currentDays.push(date.getDate());
      currentMonthName = months[date.getMonth()];
      continue;
    }

    currentDays.push(date.getDate());
  }

  // edge case catch-all for the last day
  if (!result.find(v => v.name === currentMonthName)) {
    result.push({
      name: currentMonthName,
      index: date.getMonth(),
      dates: currentDays,
      year: date.getFullYear(),
    });
  }

  return result;
}

/**
 * Returns amount of days from current date the following monday occurs
 *
 * @param day Day of the month
 * @param month Month index (from js date obj)
 * @param year Full year
 */
export function getDaysUntilWeekStart(
  day: number,
  month: number,
  year: number,
): number {
  const date = new Date(year, month, day);
  if (date.getDay() === 0) {
    return 0;
  }

  let hops = 0;
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
    hops += 1;
  }

  return 7 - hops;
}

export type MonthEntry = {
  name: string;
  index: number;
  dates: number[];
  year: number;
};

/**
 * Builds an array of months to easily iterate over
 */
export function getMonthsAsArray(): Month[] {
  return Array.of(
    Month.JANUARY,
    Month.FEBRUARY,
    Month.MARCH,
    Month.APRIL,
    Month.MAY,
    Month.JUNE,
    Month.JULY,
    Month.AUGUST,
    Month.SEPTEMBER,
    Month.OCTOBER,
    Month.NOVEMBER,
    Month.DECEMBER,
  );
}

/**
 * Builds an array of days in the week to easily iterate over
 */
export function getDaysAsArray(): Day[] {
  return Array.of(
    Day.SUNDAY,
    Day.MONDAY,
    Day.TUESDAY,
    Day.WEDNESDAY,
    Day.THURSDAY,
    Day.FRIDAY,
    Day.SATURDAY,
  );
}

// not used externally (nor should we ever), used for iterative purposes
export enum Month {
  JANUARY = 'january',
  FEBRUARY = 'february',
  MARCH = 'march',
  APRIL = 'april',
  MAY = 'may',
  JUNE = 'june',
  JULY = 'july',
  AUGUST = 'august',
  SEPTEMBER = 'september',
  OCTOBER = 'october',
  NOVEMBER = 'november',
  DECEMBER = 'december',
}

// not used externally (nor should we ever), used for iterative purposes
export enum Day {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}
