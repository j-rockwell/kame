import Head from 'next/head'
import {Navigator} from "@/components/navigation/MainNavigation";
import {HeroBanner} from "@/components/hero/HeroBanner";
import {GroupSizeSection} from "@/components/group-size-section/GroupSizeSection";
import {BookingContainer} from "@/components/booking-container/BookingContainer";
import {useBooking} from "@/hooks/Booking";
import {TableDateSection} from "@/components/table-date-section/TableDateSection";

export default function Home() {
  const {
    groupSize,
    group,
    tableTime,
    setGroupSize,
    setGroup,
    setTableTime
  } = useBooking();

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
        <HeroBanner />

        <BookingContainer>
          <GroupSizeSection
            size={groupSize}
            setSize={setGroupSize}
          />

          <TableDateSection time={tableTime} />
        </BookingContainer>
      </main>
    </>
  )
}
