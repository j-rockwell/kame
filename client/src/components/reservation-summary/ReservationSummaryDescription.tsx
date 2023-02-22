import {Property} from "csstype";
import {IScalable} from "@/hooks/Dimensions";
import {TableGroup, TableTime} from "@/models/Table";
import TextAlign = Property.TextAlign;
import {Box, Heading, Text, HeadingProps, TextProps, BoxProps, Center} from "@chakra-ui/react";

interface IReservationSummaryDescriptionProps extends IScalable {
  groupSize?: number;
  groupDate?: TableTime;
  groupTime?: TableGroup;
}

export const ReservationSummaryDescription = ({
  groupSize,
  groupDate,
  groupTime,
  isSmallDevice
}: IReservationSummaryDescriptionProps) => {
  const headingStyling: HeadingProps = {
    size: 'xl',
    fontWeight: 'semibold',
    whiteSpace: 'pre',
  }

  const textStyling: TextProps = {
    textAlign: (isSmallDevice ? 'center' : 'left') as TextAlign,
  }

  const borderStyling: BoxProps = {
    mt: '0.5rem',
    mb: '1rem',
    width: '8rem',
    borderBottomWidth: '0.5rem',
    borderBottomColor: 'brand.red',
  }

  // return empty if we don't have any values set
  if (!groupSize && !groupDate && !groupTime) {
    return null;
  }

  return (
    <Box w={'100%'}>
      <Heading {...headingStyling} {...textStyling}>
        Reservation Summary
      </Heading>

      {isSmallDevice ? (
        <Center>
          <Box {...borderStyling} />
        </Center>
      ) : (
        <Box {...borderStyling} />
      )}

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
        If you need to reschedule or cancel, please do so 72 hours prior to the reservation time to avoid cancellation fees.
      </Text>
    </Box>
  );
}