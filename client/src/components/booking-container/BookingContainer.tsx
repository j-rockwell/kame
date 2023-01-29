import {Container, VStack, useColorModeValue} from "@chakra-ui/react";
import {ReactNode} from "react";

interface IBookingContainerProps {
  children: ReactNode | JSX.Element | ReactNode[] | JSX.Element[];
}

export const BookingContainer = ({children}: IBookingContainerProps) => {
  return (
    <Container maxW={'container.xl'} mt={'4rem'}>
      <VStack spacing={'8rem'}>
        {children}
      </VStack>
    </Container>
  );
}