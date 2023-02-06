import {TableGroup} from "@/models/Table";
import {Box, Heading, useColorModeValue} from "@chakra-ui/react";

interface ReservationSummary {
  groupSize?: number;
  time?: {
    day: number;
    month: number;
    year: number;
  },
  tableGroup?: TableGroup;
}

export const ReservationSummary = ({}) => {
  const bgColor = useColorModeValue('backgroundAccent.light', 'backgroundAccent.dark');

  return (
    <Box position={'relative'} w={'100%'} px={8}>
      <Box position={'relative'} top={-4} left={0} w={'100%'} p={4} bgColor={bgColor}>
        <Heading textAlign={'center'} size={'md'}>Reservation Summary</Heading>
      </Box>
    </Box>
  );
}