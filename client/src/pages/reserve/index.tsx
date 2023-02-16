import Head from "next/head";
import {Navigator} from "@/components/navigation/MainNavigation";
import {NewCustomerInput} from "@/components/customer-new/NewCustomerInput";
import {useDimensions} from "@/hooks/Dimensions";
import {useCallback, useMemo} from "react";
import {MOBILE_WIDTH_BREAKPOINT} from "@/util/Constants";
import {NewAccountData} from "@/models/Account";

export default function Reserve() {
  const {width} = useDimensions();

  /**
   * Returns true if this page is being rendered on a mobile device
   */
  const isSmallDevice = useMemo(() => {
    return width <= MOBILE_WIDTH_BREAKPOINT;
  }, [width]);

  /**
   * Handles making a request to the server to create a new account
   */
  const onCreateNewAccount = useCallback((d: NewAccountData) => {
    console.log(d);
  }, []);

  return (
    <>
      <Head>
        <title>Sushi Kame | Finish Reservation</title>
        <meta name="description" content="Book a reservation at the best Omakase in Las Vegas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navigator />
        <NewCustomerInput onCreateNewAccount={onCreateNewAccount} isSmallDevice={isSmallDevice} />
      </main>
    </>
  )
}