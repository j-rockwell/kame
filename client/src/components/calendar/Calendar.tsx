import {useCallback, useEffect, useRef, useState} from 'react';
import {TableTime} from '@/models/Table';
import {IScalable} from '@/hooks/Dimensions';

import {
  getCalendarData,
  getDaysAsArray,
  getDaysUntilWeekStart,
  MonthEntry,
} from '@/data/Calendar';

import {
  Box,
  Center,
  Select,
  Square,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

interface ICalendarProps extends IScalable {
  time?: TableTime;
  setTime: (t: TableTime) => void;
}

export const Calendar = ({
  time,
  setTime,
  isMediumDevice,
  isSmallDevice,
}: ICalendarProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [calendarData, setCalendarData] = useState<MonthEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    undefined,
  );
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined,
  );
  const [squareSize, setSquareSize] = useState('2rem');
  const selectedDateColor = useColorModeValue('info.light', 'info.dark');
  const selectedDateTextColor = 'white';
  const selectedTextColor = useColorModeValue('text.light', 'text.dark');
  const deselectedTextColor = useColorModeValue(
    'textMuted.light',
    'textMuted.dark',
  );

  /**
   *
   * Calculates the size each calendar entry needs to be
   */
  const getSquareSize = useCallback(() => {
    if (!ref || !ref.current) {
      return '2rem';
    }

    const result = Math.floor(
      ref.current?.getBoundingClientRect().width / 7 - 2 * 7,
    );
    return `${result}px`;
  }, [ref]);

  /**
   * Returns true if the provided month number matches the selected month
   */
  const isSelectedMonth = useCallback(
    (month: number) => {
      return month === selectedMonth;
    },
    [selectedMonth],
  );

  /**
   * Returns true if the provided day number matches the selected day
   */
  const isSelectedDay = useCallback(
    (month: number, day: number) => {
      return day === selectedDay && month === selectedMonth;
    },
    [selectedDay, selectedMonth],
  );

  /**
   * Returns a formatted name for the provided day of the week
   */
  const getFormattedDayName = useCallback(
    (day: string) => {
      return (
        day.substring(0, 1).toUpperCase() +
        day.toLowerCase().substring(1, isMediumDevice || isSmallDevice ? 1 : 3)
      );
    },
    [isSmallDevice, isMediumDevice],
  );

  /**
   * Returns a formatted month name
   */
  const getFormattedMonthName = useCallback((month: string) => {
    return (
      month.substring(0, 1).toUpperCase() + month.toLowerCase().substring(1)
    );
  }, []);

  /**
   * Returns the first day of the first month
   */
  const getWeekStartGap = useCallback(() => {
    if (!calendarData || calendarData.length === 0) {
      return 0;
    }

    const month = calendarData[0];
    if (!month || month.dates.length === 0) {
      return 0;
    }

    return getDaysUntilWeekStart(month.dates[0], month.index, month.year);
  }, [calendarData]);

  /**
   * Returns calendar data for the given time values
   */
  const getData = useCallback(() => {
    const current = new Date();

    return getCalendarData(
      current.getDate(),
      current.getMonth(),
      current.getFullYear(),
      30,
    );
  }, []);

  /**
   * Handles updating months when selected from the dropdown
   */
  const handleMonthChange = useCallback(
    (index: string) => {
      const n = Number(index);
      const result = calendarData.find(m => m.index === n);

      if (!result) {
        console.error('failed to match monthIndex');
        return;
      }

      setSelectedMonth(n);
    },
    [calendarData],
  );

  /**
   * Handles changing the global state for the selected table time
   */
  const handleTimeChange = useCallback(
    (day: number, month: number, year: number) => {
      if (month !== selectedMonth) {
        return;
      }

      if (
        selectedDay === day &&
        selectedMonth === selectedMonth &&
        selectedYear === year
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
    },
    [selectedDay, selectedYear, selectedMonth, setTime],
  );

  /**
   * Helper function for easily getting date text color since there are more
   * than 2 scenarios which will determine the text color
   */
  const getDateTextColor = useCallback(
    (day: number, monthIndex: number) => {
      if (isSelectedMonth(monthIndex)) {
        if (selectedDay === day) {
          return selectedDateTextColor;
        }

        return selectedTextColor;
      }

      return deselectedTextColor;
    },
    [deselectedTextColor, isSelectedMonth, selectedDay, selectedTextColor],
  );

  /**
   * Initial data loading
   */
  useEffect(() => {
    setCalendarData(getData());
  }, [getData]);

  /**
   * Sets calendar fields whenever time field is changed
   */
  useEffect(() => {
    if (!time) {
      return;
    }

    if (!selectedDay) {
      setSelectedDay(time.day);
    }

    if (!selectedMonth) {
      setSelectedMonth(time.month);
    }

    if (!selectedYear) {
      setSelectedYear(time.year);
    }
  }, [selectedDay, selectedMonth, selectedYear, time]);

  /**
   * Handles the initial setting of square size
   */
  useEffect(() => {
    if (ref && ref.current) {
      setSquareSize(getSquareSize());
    }
  }, [ref.current, getSquareSize]);

  /**
   * Handles resizing the calendar squares on window resize events
   */
  useEffect(() => {
    function handleWindowResize() {
      setSquareSize(getSquareSize());
    }

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [ref.current, getSquareSize]);

  return (
    <Box ref={ref} w={'100%'}>
      <Center>
        <Select w={'14rem'} onChange={e => handleMonthChange(e.target.value)}>
          {calendarData.map(month => (
            <option key={month.name} value={month.index}>
              {getFormattedMonthName(month.name)} {month.year}
            </option>
          ))}
        </Select>
      </Center>

      <SimpleGrid columns={7} spacingY={2} mt={4}>
        {getDaysAsArray().map(name => (
          <Box key={name} w={getSquareSize()}>
            <Text textAlign={'center'}>{getFormattedDayName(name)}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={7} spacingY={2} mt={2}>
        {Array.from({length: getWeekStartGap()}).map((e, i) => (
          <Box key={i} w={getSquareSize()} h={getSquareSize()} />
        ))}

        {calendarData.map(month =>
          month.dates.map(date => (
            <Square
              key={date}
              size={squareSize}
              onClick={() => handleTimeChange(date, month.index, month.year)}
              cursor={isSelectedMonth(month.index) ? 'pointer' : 'auto'}
              bgColor={
                isSelectedDay(month.index, date) ? selectedDateColor : 'none'
              }
              borderRadius={12}
              borderWidth={isSelectedDay(month.index, date) ? 0 : 2}
              borderStyle={'dotted'}>
              <Text
                textAlign={'center'}
                color={getDateTextColor(date, month.index)}>
                {date}
              </Text>
            </Square>
          )),
        )}
      </SimpleGrid>
    </Box>
  );
};
