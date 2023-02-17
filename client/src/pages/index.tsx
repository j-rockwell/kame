import {useMemo} from "react";
import Head from 'next/head'
import {Navigator} from "@/components/navigation/MainNavigation";
import {BookingContainer} from "@/components/booking-container/BookingContainer";
import {useReservationContext} from "@/context/ReservationContext";
import {BookingContainerHeading} from "@/components/booking-container-heading/BookingContainerHeading";
import {useDimensions} from "@/hooks/Dimensions";
import {GroupSizeSection} from "@/components/group-size-section/GroupSizeSection";
import {TableDateSection} from "@/components/table-date-section/TableDateSection";
import {GroupTimeSection} from "@/components/group-time-section/GroupTimeSection";
import {ReserveButton} from "@/components/reserve-button/ReserveButton";
import {AiOutlineDown} from "react-icons/ai";
import {DESKTOP_WIDTH_BREAKPOINT, MOBILE_WIDTH_BREAKPOINT} from "@/util/Constants";
import {Link, VStack, Text, Icon, useColorMode} from "@chakra-ui/react";

export default function Home() {
  const {colorMode} = useColorMode();
  const {width, height} = useDimensions();
  const {
    groupSize,
    groupDate,
    groupTime,
    setGroupSize,
    setGroupTime,
    setGroupDate
  } = useReservationContext();

  /**
   * Returns true if the current view width is considered 'mobile'
   */
  const isSmallDevice = useMemo(() => {
    return width <= MOBILE_WIDTH_BREAKPOINT;
  }, [width]);

  /**
   * Returns true if the current view is likely rendered on a tablet or vertical monitor
   */
  const isMediumDevice = useMemo(() => {
    return width <= DESKTOP_WIDTH_BREAKPOINT && width > MOBILE_WIDTH_BREAKPOINT;
  }, [width]);

  return (
    <>
      <Head>
        <title>Sushi Kame | Book Reservation</title>
        <meta name="description" content="Book a reservation at the best Omakase in Las Vegas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navigator backButton={{text: 'sushikame.com', href: 'sushikame.com'}} />
        <BookingContainer
          isSmallDevice={isSmallDevice}
          screenHeight={height}
          groupSize={groupSize}
          groupTime={groupTime}
          groupDate={groupDate}>
          <BookingContainerHeading isSmallDevice={isSmallDevice}>
            Get ready for your experience at Kame.
          </BookingContainerHeading>

          <VStack spacing={32}>
            <GroupSizeSection
              isSmallDevice={isSmallDevice}
              size={groupSize}
              setSize={setGroupSize}
            />

            <TableDateSection setTime={setGroupDate} isMediumDevice={isMediumDevice} isSmallDevice={isSmallDevice} />
            <GroupTimeSection group={groupTime} setGroup={setGroupTime} isSmallDevice={isSmallDevice} />

            <ReserveButton disclaimer={'By clicking next, you are temporarily reserving this timeslot for 5 minutes.'}>
              Next
            </ReserveButton>

            {isSmallDevice && (
              <Link href={'#summary'} fontWeight={'bold'} _hover={{textDecoration: 'none'}}>
                <VStack>
                  <Text color={`text.${colorMode}`}>Reservation Summary</Text>
                  <Icon as={AiOutlineDown} color={`text.${colorMode}`} />
                </VStack>
              </Link>
            )}
          </VStack>
        </BookingContainer>
      </main>
    </>
  )
}
