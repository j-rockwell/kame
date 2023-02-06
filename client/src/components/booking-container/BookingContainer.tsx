import {Box, Stack} from "@chakra-ui/react";
import {ReactNode} from "react";
import {HeroBanner} from "@/components/hero/HeroBanner";
import {ReservationSummary} from "@/components/reservation-summary/ReservationSummary";

interface IBookingContainerProps {
  isSmallDevice: boolean;
  screenHeight: number;
  children: ReactNode | JSX.Element | ReactNode[] | JSX.Element[];
}

export const BookingContainer = ({isSmallDevice, screenHeight, children}: IBookingContainerProps) => {
  return (
    <Stack direction={isSmallDevice ? 'column-reverse' : 'row'} spacing={0}>
      <Box
        w={isSmallDevice ? '100%' : '50%'}
        minH={screenHeight}>
        <HeroBanner />
        <ReservationSummary />
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