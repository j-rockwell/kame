import {IScalable} from "@/hooks/Dimensions";
import {TableGroup, TableTime} from "@/models/Table";
import TextAlign = Property.TextAlign;
import {Property} from "csstype";
import {Box, Heading, Image, Text, useColorModeValue} from "@chakra-ui/react";

interface IReservationSummaryProps extends IScalable {
  groupSize?: number;
  groupDate?: TableTime;
  groupTime?: TableGroup;
}

export const ReservationSummary = ({
  groupSize,
  groupDate,
  groupTime,
  isSmallDevice
}: IReservationSummaryProps) => {
  const IMAGE_HEIGHT_REM = 32;
  const textColor = useColorModeValue('text.light', 'text.dark');
  const textStyling = {
    textAlign: (isSmallDevice ? 'center' : 'left') as TextAlign,
    color: textColor,
  }

  return (
    <Box
      id={'summary'}
      w={'100%'}
      sx={{
        position: '-webkit-sticky',
        // @ts-ignore - safari fix
        position: 'sticky',
        top: '0'
      }}>
      <Image
        src={'./hero-1.webp'}
        w={'100%'}
        h={`${IMAGE_HEIGHT_REM}rem`}
        objectFit={'cover'}
        objectPosition={'left'}
      />

      {(groupSize || groupDate || groupTime) && (
        <Box
          position={'absolute'}
          w={'100%'}
          top={`${IMAGE_HEIGHT_REM + 2}rem`}
          px={isSmallDevice ? 8 : 36}
          left={0}>
          <Heading
            size={'xl'}
            fontWeight={'normal'}
            mb={8}
            {...textStyling}>
            Reservation Summary
          </Heading>

          {groupSize && (
            <Text {...textStyling}>
              <b>{groupSize} {groupSize > 1 ? 'guests' : 'guest'}</b> will be attending
            </Text>
          )}

          {groupDate && (
            <Text {...textStyling}>
              Reservation is on <b>{groupDate.month + 1}/{groupDate.day}/{groupDate.year}</b>
            </Text>
          )}

          {groupTime && (
            <Text {...textStyling}>
              Guests should arrive by <b>{groupTime === 'A' ? '6:30pm (PST)' : '8:30pm (PST)'}</b>
            </Text>
          )}

          <Text fontSize={'1rem'} mt={'2rem'} {...textStyling}>
            If you need to reschedule or cancel, please do so 72 hours before the reservation time to avoid any cancellation fees.
          </Text>
        </Box>
      )}
    </Box>
  );
}