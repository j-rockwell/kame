import Head from "next/head";
import {useMemo} from "react";
import {useDimensions} from "@/hooks/Dimensions";
import {Navigator} from "@/components/navigation/MainNavigation";
import {Footer} from "@/components/footer/Footer";

import {DESKTOP_WIDTH_BREAKPOINT, MOBILE_WIDTH_BREAKPOINT} from "@/util/Constants";

export default function CardDetails() {
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
        <meta name="description" content="Book a reservation at the best Omakase in Las Vegas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <main>
        <Navigator backButton={{text: 'Back', href: '/'}} />
      </main>

      <footer>
        <Footer isSmallDevice={isSmallDevice} isMediumDevice={isMediumDevice} />
      </footer>
    </>
  );
}
