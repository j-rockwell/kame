/**
 * Returns the week from the current day index (used for calendar day name display)
 * @param current Current dayIndex (from js Date obj)
 */
export function getDayNamesFromCurrentDay(current: number): Day[] {
  const days = getDaysAsArray();
  let result: Day[] = [];
  let currentIndex = current;

  for (let i = 0; i < 7; i++) {
    if (currentIndex > 6) {
      currentIndex = 0;
    }

    result.push(days[currentIndex]);
    currentIndex += 1;
  }

  return result;
}

/**
 * Returns n (amount) of days starting at the provided date values
 * @param day Day of the month (0-31)
 * @param month Month of the year (0-11)
 * @param year Full year (e.g 2023)
 * @param amount Amount of days to collect
 */
export function getDays(
  day: number,
  month: number,
  year: number,
  amount: number
): number[] {
  let d = new Date(year, month, day);
  let result: number[] = [];

  result.push(d.getDate());

  for (let i = 0; i < (amount - 1); i++) {
    d.setDate(d.getDate() + 1);
    result.push(d.getDate());
  }

  return result;
}

/**
 * Returns n (amount) month names starting at the provided monthIndex
 * @param month monthIndex (from js Date obj)
 * @param amount Amount of months to collect
 */
export function getMonths(month: number, amount: number): string[] {
  const months = getMonthsAsArray();
  let result: string[] = [];
  let index = month;

  for (let i = 0; i < amount; i++) {
    if (index > 11) {
      index = 0;
    }

    result.push(months[index]);
    index += 1;
  }

  return result;
}

/**
 * Returns the string value for the month number provided
 * @param month Month number (derived from date object)
 */
export function getCurrentMonth(month: number): string {
  const months = getMonthsAsArray();
  return months[month];
}

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
  )
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
  )
}

// not used externally (nor should we ever), used for iterative purposes
enum Month {
  JANUARY = "january",
  FEBRUARY = "february",
  MARCH = "march",
  APRIL = "april",
  MAY = "may",
  JUNE = "june",
  JULY = "july",
  AUGUST = "august",
  SEPTEMBER = "september",
  OCTOBER = "october",
  NOVEMBER = "november",
  DECEMBER = "december",
}

// not used externally (nor should we ever), used for iterative purposes
enum Day {
  SUNDAY = "sunday",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
}