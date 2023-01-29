import {useMemo} from "react";
import {useScreenWidth} from "@/hooks/Width";
import {TableTime} from "@/models/Table";
import {Calendar} from "@/components/calendar/Calendar";
import {Box, Stack} from "@chakra-ui/react";
import {Step} from "@/components/step/Step";

interface ITableDateSection {
  time?: TableTime;
  setTime: (t: TableTime) => void;
}

export const TableDateSection = ({time, setTime}: ITableDateSection) => {
  const WIDTH = useScreenWidth();

  /**
   * Returns true if this component is being viewed on a smaller screen
   */
  const isSmallDevice = useMemo(() => {
    return WIDTH <= 768;
  }, [WIDTH]);

  return (
    <Box w={'100%'}>
      <Stack
        spacing={isSmallDevice ? '2rem' : '4rem'}
        direction={isSmallDevice ? 'column' : 'row'}
        alignItems={isSmallDevice ? 'center' : 'left'}>
        <Step
          title={'Date'}
          value={2}
          center={isSmallDevice}
        />

        <Calendar time={time} setTime={setTime} />
      </Stack>
    </Box>
  );
}