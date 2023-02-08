import {Calendar} from "@/components/calendar/Calendar";
import {IScalable} from "@/hooks/Dimensions";
import {TableTime} from "@/models/Table";
import {Box, Heading} from "@chakra-ui/react";

interface ITableDateSection extends IScalable {
  setTime: (t: TableTime) => void;
}

export const TableDateSection = ({setTime, isSmallDevice}: ITableDateSection) => {
  return (
    <Box w={'100%'}>
      <Heading textAlign={isSmallDevice ? 'center' : 'left'} size={'md'} mb={8}>
        Date
      </Heading>

      <Calendar setTime={setTime} isSmallDevice={isSmallDevice} />
    </Box>
  );
}