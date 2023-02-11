import Head from "next/head";
import {Navigator} from "@/components/navigation/MainNavigation";

export default function Reserve() {
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
      </main>
    </>
  )
}