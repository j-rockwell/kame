import {useCallback, useEffect, useState} from "react";
import {TableTime} from "@/models/Table";

import {
  getCalendarData,
  getDaysAsArray,
  getDaysUntilStartOfWeek,
  MonthEntry
} from "@/data/Calendar";

import {Box, Center, Select, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";

interface ICalendarProps {
  setTime: (t: TableTime) => void;
}

export const Calendar = ({setTime}: ICalendarProps) => {
  const CURRENT_DATE = new Date();
  const START_MONTH: number = CURRENT_DATE.getMonth();
  const START_DAY: number = CURRENT_DATE.getDate();
  const START_YEAR: number = CURRENT_DATE.getFullYear();
  const [calendarData, setCalendarData] = useState<MonthEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(START_DAY);
  const [selectedMonth, setSelectedMonth] = useState<number>(START_MONTH);
  const [selectedYear, setSelectedYear] = useState<number>(START_YEAR);

  const selectedTextColor = useColorModeValue('text.light', 'text.dark');
  const deselectedTextColor = useColorModeValue('textMuted.light', 'textMuted.dark');

  /**
   * Returns true if the provided month number matches the selected month
   */
  const isSelectedMonth = useCallback((month: number) => {
    return month === selectedMonth;
  }, [selectedMonth]);

  /**
   * Returns true if the provided day number matches the selected day
   */
  const isSelectedDay = useCallback((month: number, day: number) => {
    return (day === selectedDay && month === selectedMonth);
  }, [selectedDay, selectedMonth]);

  /**
   * Returns a formatted name for the provided day of the week
   */
  const getFormattedDayName = useCallback((day: string) => {
    return day.substring(0, 1).toUpperCase() + day.toLowerCase().substring(1, 3);
  }, []);

  /**
   * Returns a formatted month name
   */
  const getFormattedMonthName = useCallback((month: string) => {
    return month.substring(0, 1).toUpperCase() + month.toLowerCase().substring(1);
  }, []);

  /**
   * Returns the first day of the first month
   */
  const getWeekStartGap = useCallback(() => {
    if (!calendarData || calendarData.length === 0) {
      return 0;
    }

    const first = calendarData[0].dates[0];
    const result = getDaysUntilStartOfWeek(first);
    console.debug(`dayIndex: ${first}`);
    console.debug(`result: ${result}`);
    return result;
  }, [calendarData]);

  /**
   * Returns calendar data for the given time values
   */
  const getData = useCallback(() => {
    return getCalendarData(
      START_DAY,
      START_MONTH,
      START_YEAR,
      30
    );
  }, [START_DAY, START_MONTH, START_YEAR]);

  /**
   * Handles updating months when selected from the dropdown
   */
  const handleMonthChange = useCallback((index: string) => {
    const n = Number(index);
    const result = calendarData.find(m => m.index === n);

    if (!result) {
      console.error("failed to match monthIndex");
      return;
    }

    setSelectedMonth(n);
  }, [calendarData]);

  /**
   * Handles changing the global state for the selected table time
   */
  const handleTimeChange = useCallback((day: number, month: number, year: number) => {
    if (
      selectedDay === day
      && selectedMonth === selectedMonth
      && selectedYear === year
    ) {
      return;
    }

    if (selectedDay !== day) {
      setSelectedDay(day);
    }

    if (selectedMonth != month) {
      setSelectedMonth(month);
    }

    if (selectedYear != year) {
      setSelectedYear(year);
    }

    setTime({day: day, month: month, year: year});
  }, [selectedDay, selectedYear, selectedMonth, setTime]);

  /**
   * Initial data loading
   */
  useEffect(() => {
    setCalendarData(getData());
  }, [getData]);

  return (
    <Box>
      <Center>
        <Select w={'14rem'} onChange={e => handleMonthChange(e.target.value)}>
          {calendarData.map(month => (
            <option key={month.name} value={month.index}>{getFormattedMonthName(month.name)} {month.year}</option>
          ))}
        </Select>
      </Center>

      <SimpleGrid columns={7} spacing={2} mt={4}>
        {getDaysAsArray().map(name => (
          <Box key={name} w={16} h={8}>
            <Text textAlign={'center'}>{getFormattedDayName(name)}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={7} spacing={2}>
        {Array.from({length: getWeekStartGap()}).map((e, i) => (
          <Box key={i} w={16} h={8} bgColor={'red.500'} />
        ))}

        {calendarData.map(month => month.dates.map(date => (
          <Box
            key={date}
            w={16}
            h={8}
            onClick={() => handleTimeChange(date, month.index, month.year)}
            cursor={isSelectedMonth(month.index) ? 'pointer' : 'auto'}
            bgColor={isSelectedDay(month.index, date) ? 'blue.500' : 'none'}>
            <Text
              textAlign={'center'}
              color={isSelectedMonth(month.index) ? selectedTextColor : deselectedTextColor}
            >
              {date}
            </Text>
          </Box>
        )))}
      </SimpleGrid>
    </Box>
  );
}