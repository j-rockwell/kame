import Head from "next/head";
import LoginForm from "@/components/loginform/LoginForm";

export default function Login() {
  return (
    <>
      <Head>
        <title>Kame Admin | Login</title>
        <meta name="description" content="Kame Booking" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter" />
      </Head>

      <main>
        <LoginForm />
      </main>
    </>
  );
}