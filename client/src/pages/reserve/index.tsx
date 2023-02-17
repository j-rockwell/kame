import {useCallback, useMemo, useState} from "react";
import Head from "next/head";
import {Navigator} from "@/components/navigation/MainNavigation";
import {useDimensions} from "@/hooks/Dimensions";
import {createAccount} from "@/requests/Account";
import {CustomerDetails} from "@/components/customer-details-section/CustomerDetails";
import {LoginAccountData, NewAccountData} from "@/models/Account";
import {MOBILE_WIDTH_BREAKPOINT} from "@/util/Constants";

export default function Reserve() {
  const {width} = useDimensions();
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);

    createAccount({
      first_name: d.firstName,
      last_name: d.lastName,
      email_address: d.emailAddress,
      phone: d.phone,
      password: d.password,
    }).then(data => {
      console.debug(data);
      console.debug('success');
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const onLoginAttempt = useCallback((d: LoginAccountData) => {
    setLoading(true);

    // TODO: impl login logic
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
        <CustomerDetails
          isLoading={isLoading}
          onLoginAttempt={onLoginAttempt}
          onCreateNewAccount={onCreateNewAccount}
          isSmallDevice={isSmallDevice}
        />
      </main>
    </>
  )
}