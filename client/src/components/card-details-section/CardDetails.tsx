import {IScalable, useDimensions} from '@/hooks/Dimensions';
import {ReservationSummaryDescription} from '@/components/reservation-summary/ReservationSummaryDescription';
import {useReservationContext} from '@/context/ReservationContext';
import {CardForm} from '@/components/card-details/CardForm';
import {Container, Heading, Image, Stack, VStack} from '@chakra-ui/react';

interface ICardDetailsProps extends IScalable {
  onSubmit: () => void;
}

export const CardDetails = ({
  onSubmit,
  isMediumDevice,
  isSmallDevice,
}: ICardDetailsProps) => {
  const {height} = useDimensions();
  const {groupSize, groupDate, groupTime, groupMenu} = useReservationContext();

  return (
    <Container maxW={'container.xl'}>
      <Stack
        w={'100%'}
        direction={isSmallDevice ? 'column' : 'row'}
        spacing={isSmallDevice || isMediumDevice ? '2rem' : '8rem'}>
        <VStack w={'100%'}>
          <Image
            src={'/hero-3.webp'}
            alt={'kame backdrop'}
            w={'100%'}
            h={height * 0.75}
            mb={'1rem'}
            objectFit={'cover'}
            pt={isSmallDevice ? 0 : '2rem'}
          />

          <ReservationSummaryDescription
            isSmallDevice={isSmallDevice}
            groupSize={groupSize}
            groupDate={groupDate}
            groupTime={groupTime}
            groupMenu={groupMenu}
          />
        </VStack>

        <VStack
          w={'100%'}
          alignItems={isSmallDevice ? 'center' : 'left'}
          pt={'2rem'}>
          <Heading size={'xl'} textAlign={isSmallDevice ? 'center' : 'left'}>
            Enter your card details to complete the reservation.
          </Heading>
          <CardForm isSmallDevice={isSmallDevice} />
        </VStack>
      </Stack>
    </Container>
  );
};
