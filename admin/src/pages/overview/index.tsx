import Head from "next/head";
import AdminLayout from "@/layout/AdminLayout";
import Summary from "@/components/summary/Summary";

export default function Overview() {
  return (
    <>
      <Head>
        <title>Kame Admin | Overview</title>
        <meta name="description" content="Kame Booking" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter" />
      </Head>

      <main>
        <AdminLayout>
          <Summary />
        </AdminLayout>
      </main>
    </>
  );
}