import {ChakraProvider} from '@chakra-ui/react'
import {ReservationContextProvider} from "@/context/ReservationContext.Provider";
import theme from '../styles/Theme';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReservationContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ReservationContextProvider>
  )
}
