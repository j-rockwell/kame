import {useCallback, useMemo} from "react";
import {getDayNamesFromCurrentDay, getDays, getMonths} from "@/data/Calendar";
import {useScreenWidth} from "@/hooks/Width";
import {TableTime} from "@/models/Table";
import {Box, SimpleGrid, Text} from "@chakra-ui/react";

interface ICalendarProps {
  time?: TableTime;
}

export const Calendar = ({time}: ICalendarProps) => {
  const WIDTH = useScreenWidth();
  const CURRENT_DATE = new Date();
  const START_MONTH: number = CURRENT_DATE.getMonth();
  const START_DAY: number = CURRENT_DATE.getDate();
  const START_YEAR: number = CURRENT_DATE.getFullYear();

  /**
   * Returns true if this component is being viewed on a smaller screen
   */
  const isSmallDevice = useMemo(() => {
    return WIDTH <= 768;
  }, [WIDTH]);

  /**
   * Returns an array of all the days in the
   */
  const getDaysInMonth = useCallback(() => {
    return getDays(
      time?.day ?? START_DAY,
      time?.month ?? START_MONTH,
      time?.year ?? START_YEAR,
      30
    )
  }, [START_DAY, START_MONTH, START_YEAR, time?.day, time?.month, time?.year]);

  /**
   * Returns an array of the next twelve months including the current month
   */
  const getMonthsInYear = useCallback(() => {
    return getMonths(time?.month ?? START_MONTH, 11);
  }, [START_MONTH, time?.month]);

  /**
   * Returns an array of day names to iterate over for calendar day display
   */
  const getDayNames = useCallback(() => {
    const date = new Date(
      time?.year ?? START_YEAR,
      time?.month ?? START_MONTH,
      time?.day ?? START_DAY
    );

    return getDayNamesFromCurrentDay(date.getDay());
  }, [START_DAY, START_MONTH, START_YEAR, time?.day, time?.month, time?.year]);

  /**
   * Returns a formatted name for the provided day of the week
   */
  const getFormattedDayName = useCallback((day: string) => {
    return day.substring(0, 1).toUpperCase() + day.toLowerCase().substring(1, 3);
  }, []);

  return (
    <Box>
      <SimpleGrid columns={7} spacing={2}>
        {getDayNames().map(name => (
          <Box key={name} w={16} h={8}>
            <Text textAlign={'center'}>{getFormattedDayName(name)}</Text>
          </Box>
        ))}

        {getDaysInMonth().map(day => (
          <Box key={day} w={16} h={8}>
            <Text textAlign={'center'}>{day}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}