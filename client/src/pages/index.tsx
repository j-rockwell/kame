import Head from 'next/head'
import {Navigator} from "@/components/navigation/MainNavigation";
import {BookingContainer} from "@/components/booking-container/BookingContainer";
import {useBooking} from "@/hooks/Booking";
import {BookingContainerHeading} from "@/components/booking-container-heading/BookingContainerHeading";
import {useDimensions} from "@/hooks/Dimensions";
import {useCallback, useMemo} from "react";
import {GroupSizeSection} from "@/components/group-size-section/GroupSizeSection";
import {TableDateSection} from "@/components/table-date-section/TableDateSection";
import {GroupTimeSection} from "@/components/group-time-section/GroupTimeSection";
import {ReserveButton} from "@/components/reserve-button/ReserveButton";
import {MOBILE_WIDTH_BREAKPOINT} from "@/util/Constants";
import {VStack} from "@chakra-ui/react";

export default function Home() {
  const {
    groupSize,
    group,
    tableTime,
    setGroupSize,
    setGroup,
    setTableTime
  } = useBooking();

  const {width, height} = useDimensions();

  const isSmallDevice = useMemo(() => {
    return width <= MOBILE_WIDTH_BREAKPOINT;
  }, [width]);

  const onSubmit = useCallback(() => {
    console.debug(`groupSize: ${groupSize}, group: ${group}, tableTime: ${tableTime.day} ${tableTime.month} ${tableTime.year}`);
  }, [group, groupSize, tableTime]);

  return (
    <>
      <Head>
        <title>Sushi Kame | Book Reservation</title>
        <meta name="description" content="Book a reservation at the best Omakase in Las Vegas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navigator />
        <BookingContainer
          isSmallDevice={isSmallDevice}
          screenHeight={height}
          groupSize={groupSize}
          groupTime={group}
          groupDate={tableTime}>
          <BookingContainerHeading isSmallDevice={isSmallDevice}>
            Get ready for your experience at Kame.
          </BookingContainerHeading>

          <VStack spacing={32}>
            <GroupSizeSection
              isSmallDevice={isSmallDevice}
              size={groupSize}
              setSize={setGroupSize}
            />

            <TableDateSection setTime={setTableTime} isSmallDevice={isSmallDevice} />
            <GroupTimeSection group={group} setGroup={setGroup} isSmallDevice={isSmallDevice} />

            <ReserveButton
              onClick={onSubmit}
              disclaimer={'By clicking next, you are temporarily reserving this timeslot for 5 minutes.'}
            >
              Next
            </ReserveButton>
          </VStack>
        </BookingContainer>
      </main>
    </>
  )
}
