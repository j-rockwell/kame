import {useMemo} from 'react';
import Head from 'next/head';
import {useDimensions} from '@/hooks/Dimensions';
import {Footer} from '@/components/footer/Footer';
import {CardDetails} from '@/components/card-details-section/CardDetails';
import {Navigator} from '@/components/navigation/Navigator';
import {
  DESKTOP_WIDTH_BREAKPOINT,
  MOBILE_WIDTH_BREAKPOINT,
} from '@/util/Constants';

export default function Card() {
  const {width} = useDimensions();

  /**
   * Returns true if this page is being rendered on a mobile device
   */
  const isSmallDevice = useMemo(() => {
    return width <= MOBILE_WIDTH_BREAKPOINT;
  }, [width]);

  /**
   * Returns true if this page is being rendered on a mobile device
   */
  const isMediumDevice = useMemo(() => {
    return width <= DESKTOP_WIDTH_BREAKPOINT && width > MOBILE_WIDTH_BREAKPOINT;
  }, [width]);

  return (
    <>
      <Head>
        <title>Sushi Kame | Card Details</title>
        <meta
          name="description"
          content="Book a reservation at the best Omakase in Las Vegas"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <main>
        <Navigator viewWidth={width} isSmallDevice={isSmallDevice} />
        <CardDetails
          isMediumDevice={isMediumDevice}
          isSmallDevice={isSmallDevice}
          onSubmit={() => {}}
        />
      </main>

      <footer>
        <Footer isSmallDevice={isSmallDevice} isMediumDevice={isMediumDevice} />
      </footer>
    </>
  );
}
