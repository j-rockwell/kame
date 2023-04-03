import Head from "next/head";
import {Navigator} from "@/components/navigation/Navigator";
import {useDimensions} from "@/hooks/Dimensions";
import {useMemo} from "react";
import {DESKTOP_WIDTH_BREAKPOINT, MOBILE_WIDTH_BREAKPOINT} from "@/util/Constants";
import {Footer} from "@/components/footer/Footer";
import {FaqSection} from "@/components/faq-section/FaqSection";
import {Container} from "@chakra-ui/react";

export default function FAQ() {
  const {width} = useDimensions();

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
        <title>Sushi Kame | FAQ</title>
        <meta name="description" content="Book a reservation at the best Omakase in Las Vegas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navigator viewWidth={width} isSmallDevice={isSmallDevice} />

        <Container maxW={'container.xl'}>
          <FaqSection isSmallDevice={isSmallDevice} isMediumDevice={isMediumDevice} />
        </Container>
      </main>

      <footer>
        <Footer isSmallDevice={isSmallDevice} isMediumDevice={isMediumDevice} />
      </footer>
    </>
  );
}