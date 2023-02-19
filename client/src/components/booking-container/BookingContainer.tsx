import {Box, Stack} from "@chakra-ui/react";
import {ReactNode} from "react";
import {IScalable} from "@/hooks/Dimensions";
import {ReservationSummary} from "@/components/reservation-summary/ReservationSummary";
import {TableGroup, TableTime} from "@/models/Table";

interface IBookingContainerProps extends IScalable {
  screenHeight: number;
  groupSize?: number;
  groupDate?: TableTime;
  groupTime?: TableGroup;
  children: ReactNode | JSX.Element | ReactNode[] | JSX.Element[];
}

export const BookingContainer = ({
  isSmallDevice,
  isMediumDevice,
  screenHeight,
  groupSize,
  groupDate,
  groupTime,
  children
}: IBookingContainerProps) => {
  return (
    <Stack direction={isSmallDevice ? 'column-reverse' : 'row'} spacing={0}>
      <Box w={isSmallDevice ? '100%' : '50%'}>
        <ReservationSummary
          groupSize={groupSize}
          groupDate={groupDate}
          groupTime={groupTime}
          isMediumDevice={isMediumDevice}
          isSmallDevice={isSmallDevice}
        />
      </Box>

      <Box
        w={isSmallDevice ? '100%' : '50%'}
        minH={screenHeight}
        px={isSmallDevice ? 16 : 36}
        py={16}>
        {children}
      </Box>
    </Stack>
  );
}