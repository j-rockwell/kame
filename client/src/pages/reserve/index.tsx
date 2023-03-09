import Head from "next/head";
import {redirect} from "next/navigation";
import {useCallback, useMemo, useState} from "react";
import {Navigator} from "@/components/navigation/MainNavigation";
import {useDimensions} from "@/hooks/Dimensions";
import {createAccount} from "@/requests/Account";
import {CustomerDetails} from "@/components/customer-details-section/CustomerDetails";
import {Footer} from "@/components/footer/Footer";
import {useAuthContext} from "@/context/AuthContext";
import {attemptLoginWithCredentials} from "@/requests/Auth";
import {LoginAccountData, NewAccountData} from "@/models/Account";
import {DESKTOP_WIDTH_BREAKPOINT, MOBILE_WIDTH_BREAKPOINT} from "@/util/Constants";

export default function Reserve() {
  const {width} = useDimensions();
  const {setAccessToken, setLoadingAccountError} = useAuthContext();
  const [isLoading, setLoading] = useState(false);

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
      setAccessToken(data.access_token);
      redirect('/card-details');
    }).catch(err => {
      // TODO: Flash error
      setLoadingAccountError(err);
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [setAccessToken, setLoadingAccountError]);

  /**
   * Handles making a request to the server to authorize an existing account
   */
  const onLoginAttempt = useCallback((d: LoginAccountData) => {
    setLoading(true);

    attemptLoginWithCredentials({email_address: d.emailAddress, password: d.password}).then(data => {
      setAccessToken(data.access_token);
      redirect('/card-details');
    }).catch(err => {
      setLoadingAccountError(err);
      // TODO: Flash error
    }).finally(() => {
      setLoading(false);
    });

    // TODO: impl login logic
  }, [setAccessToken, setLoadingAccountError]);

  return (
    <>
      <Head>
        <title>Sushi Kame | Finish Reservation</title>
        <meta name="description" content="Book a reservation at the best Omakase in Las Vegas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navigator backButton={{text: 'Back', href: '/'}} />
        <CustomerDetails
          isLoading={isLoading}
          onLoginAttempt={onLoginAttempt}
          onCreateNewAccount={onCreateNewAccount}
          isSmallDevice={isSmallDevice}
        />
      </main>

      <footer>
        <Footer isSmallDevice={isSmallDevice} isMediumDevice={isMediumDevice} />
      </footer>
    </>
  )
}