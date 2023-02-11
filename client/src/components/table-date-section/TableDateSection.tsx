import {Calendar} from "@/components/calendar/Calendar";
import {IScalable} from "@/hooks/Dimensions";
import {TableTime} from "@/models/Table";
import {Box, Heading, useColorModeValue} from "@chakra-ui/react";

interface ITableDateSection extends IScalable {
  setTime: (t: TableTime) => void;
}

export const TableDateSection = ({setTime, isMediumDevice, isSmallDevice}: ITableDateSection) => {
  return (
    <Box w={'100%'}>
      <Heading
        textAlign={isSmallDevice ? 'center' : 'left'}
        size={'lg'}
        mb={8}>
        When will you be joining us?
      </Heading>

      <Calendar setTime={setTime} isMediumDevice={isMediumDevice} isSmallDevice={isSmallDevice} />
    </Box>
  );
}