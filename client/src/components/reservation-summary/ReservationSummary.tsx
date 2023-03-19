import {IScalable} from "@/hooks/Dimensions";
import {TableGroup, TableTime} from "@/models/Table";
import {ReservationSummaryDescription} from "@/components/reservation-summary/ReservationSummaryDescription";
import {Box, Image} from "@chakra-ui/react";
import {MenuSanitized} from "@/models/Menu";

interface IReservationSummaryProps extends IScalable {
  groupSize?: number;
  groupDate?: TableTime;
  groupTime?: TableGroup;
  groupMenu?: MenuSanitized;
}

export const ReservationSummary = ({
  groupSize,
  groupDate,
  groupTime,
  groupMenu,
  isSmallDevice
}: IReservationSummaryProps) => {
  return (
    <Box
      id={'summary'}
      w={'100%'}
      zIndex={1}
      // @ts-ignore - safari sticky fix
      style={{position: '-webkit-sticky', position: 'sticky', top: isSmallDevice ? 0 : '4rem'}}>
      <Image
        src={'/hero-1.webp'}
        w={'100%'}
        h={`32rem`}
        mb={'1rem'}
        borderRadius={12}
        objectFit={'cover'}
        objectPosition={'left'}
      />

      <ReservationSummaryDescription
        isSmallDevice={isSmallDevice}
        groupDate={groupDate}
        groupTime={groupTime}
        groupSize={groupSize}
        groupMenu={groupMenu}
      />
    </Box>
  );
}