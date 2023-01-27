import {Container, VStack, useColorModeValue} from "@chakra-ui/react";
import {ReactNode} from "react";

interface IBookingContainerProps {
  children: ReactNode | JSX.Element | ReactNode[] | JSX.Element[];
}

export const BookingContainer = ({children}: IBookingContainerProps) => {
  const bgColor = useColorModeValue('backgroundAccent.light', 'backgroundAccent.dark');

  return (
    <Container
      position={'relative'}
      top={-8}
      maxW={'container.xl'}
      p={8}
      borderRadius={12}
      bgColor={bgColor}>
      <VStack spacing={'8rem'}>
        {children}
      </VStack>
    </Container>
  );
}