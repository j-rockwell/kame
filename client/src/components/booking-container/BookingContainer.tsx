import {ReactNode} from "react";
import {IScalable} from "@/hooks/Dimensions";
import {TableGroup, TableTime} from "@/models/Table";
import {MenuSanitized} from "@/models/Menu";
import {ReservationSummary} from "@/components/reservation-summary/ReservationSummary";
import {Box, Stack} from "@chakra-ui/react";

interface IBookingContainerProps extends IScalable {
  screenHeight: number;
  groupSize?: number;
  groupDate?: TableTime;
  groupTime?: TableGroup;
  groupMenu?: MenuSanitized;
  children: ReactNode | JSX.Element | ReactNode[] | JSX.Element[];
}

export const BookingContainer = ({
  isSmallDevice,
  isMediumDevice,
  screenHeight,
  groupSize,
  groupDate,
  groupTime,
  groupMenu,
  children
}: IBookingContainerProps) => {
  return (
    <Stack direction={isSmallDevice ? 'column-reverse' : 'row'} spacing={0}>
      <Box
        pos={'relative'}
        w={isSmallDevice ? '100%' : '50%'}
        pl={(isSmallDevice || isMediumDevice) ? 4: 36}
        pr={(isSmallDevice || isMediumDevice) ? 4 : 0}>
        <ReservationSummary
          groupSize={groupSize}
          groupDate={groupDate}
          groupTime={groupTime}
          groupMenu={groupMenu}
          isMediumDevice={isMediumDevice}
          isSmallDevice={isSmallDevice}
        />
      </Box>

      <Box
        w={isSmallDevice ? '100%' : '50%'}
        minH={screenHeight}
        px={(isSmallDevice || isMediumDevice) ? 4 : 36}
        py={16}>
        {children}
      </Box>
    </Stack>
  );
}