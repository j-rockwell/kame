export type Month = {
  name: string;
  numeric: string;
}

/**
 * Returns the next n years as a string array
 */
export function getYears(amount: number): string[] {
  const date = new Date();
  let result: string[] = [];

  for (let i = 0; i < amount; i++) {
    result.push((date.getFullYear() + i).toString());
  }

  return result;
}

/**
 * Returns an array of all months in a year
 */
export function getMonths(): Month[] {
  return [
    {
      "name": "January",
      "numeric": "01",
    },
    {
      "name": "February",
      "numeric": "02",
    },
    {
      "name": "March",
      "numeric": "03",
    },
    {
      "name": "April",
      "numeric": "04",
    },
    {
      "name": "May",
      "numeric": "05",
    },
    {
      "name": "June",
      "numeric": "06",
    },
    {
      "name": "July",
      "numeric": "07",
    },
    {
      "name": "August",
      "numeric": "08",
    },
    {
      "name": "September",
      "numeric": "09",
    },
    {
      "name": "October",
      "numeric": "10",
    },
    {
      "name": "November",
      "numeric": "11",
    },
    {
      "name": "December",
      "numeric": "12",
    },
  ]
}