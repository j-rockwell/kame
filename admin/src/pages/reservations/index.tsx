import Head from "next/head";
import {useEffect} from "react";
import {getTables} from "@/request/Table";
import AdminLayout from "@/layout/AdminLayout";

export default function Reservations() {
  useEffect(() => {
    getTables(0).then(d => {
      console.log(d);
    }).catch(e => {
      console.error(e);
    })
  }, []);

  return (
    <>
      <Head>
        <title>Kame Booking Admin | Reservations</title>
        <meta name="description" content="Kame Booking" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AdminLayout>
          <h1>Middle content</h1>
        </AdminLayout>
      </main>
    </>
  );
}