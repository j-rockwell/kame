import {IScalable} from "@/hooks/Dimensions";
import {Box, Heading} from "@chakra-ui/react";

interface ICustomerDetailsNewInputProps extends IScalable {}

export const CustomerDetailsNewInput = ({isSmallDevice}: ICustomerDetailsNewInputProps) => {
  return (
    <Box w={'100%'}>
      <Heading
        textAlign={isSmallDevice ? 'center' : 'left'}
        size={'md'}
        fontWeight={'normal'}>
        New customer
      </Heading>
    </Box>
  );
}