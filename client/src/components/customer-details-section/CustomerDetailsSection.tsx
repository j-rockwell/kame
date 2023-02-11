import {IScalable} from "@/hooks/Dimensions";
import {Box, Heading} from "@chakra-ui/react";
import {CustomerDetailsLogin} from "@/components/customer-details-login/CustomerDetailsLogin";
import {CustomerDetailsNewInput} from "@/components/customer-details-new/CustomerDetailsNewInput";

interface ICustomerDetailsSection extends IScalable {}

export const CustomerDetailsSection = ({isSmallDevice}: ICustomerDetailsSection) => {
  return (
    <Box w={'100%'}>
      <Heading
        textAlign={isSmallDevice ? 'center' : 'left'}
        size={'md'}
        mb={8}>
        Customer Details
      </Heading>

      <CustomerDetailsLogin isSmallDevice={isSmallDevice} />
      <CustomerDetailsNewInput isSmallDevice={isSmallDevice} />
    </Box>
  );
}