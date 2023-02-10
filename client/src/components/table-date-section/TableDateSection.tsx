import {Calendar} from "@/components/calendar/Calendar";
import {IScalable} from "@/hooks/Dimensions";
import {TableTime} from "@/models/Table";
import {Box, Heading, useColorModeValue} from "@chakra-ui/react";

interface ITableDateSection extends IScalable {
  setTime: (t: TableTime) => void;
}

export const TableDateSection = ({setTime, isMediumDevice, isSmallDevice}: ITableDateSection) => {
  const textColor = useColorModeValue('text.light', 'text.dark');

  return (
    <Box w={'100%'}>
      <Heading color={textColor} textAlign={isSmallDevice ? 'center' : 'left'} size={'md'} mb={8}>
        Date
      </Heading>

      <Calendar setTime={setTime} isMediumDevice={isMediumDevice} isSmallDevice={isSmallDevice} />
    </Box>
  );
}