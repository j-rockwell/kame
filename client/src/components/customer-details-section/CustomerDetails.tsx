import {Box, Container, Image, Stack, VStack} from "@chakra-ui/react";
import {IScalable, useDimensions} from "@/hooks/Dimensions";
import {NewCustomerInput} from "@/components/customer-new/NewCustomerInput";
import {LoginAccountData, NewAccountData} from "@/models/Account";
import {CustomerLoginInput} from "@/components/customer-login/CustomerLoginInput";
import {useCallback, useEffect, useState} from "react";

interface ICustomerDetailsProps extends IScalable {
  isLoading: boolean;
  onCreateNewAccount: (d: NewAccountData) => void;
  onLoginAttempt: (d: LoginAccountData) => void;
}

export const CustomerDetails = ({
  isLoading,
  onCreateNewAccount,
  onLoginAttempt,
  isSmallDevice
}: ICustomerDetailsProps) => {
  const {width, height} = useDimensions();
  const [isNewCustomerFieldsActive, setNewCustomerFieldsActive] = useState(false);

  /**
   * Override func to prevent opacity errors on vertical screens or
   * mobile devices.
   */
  const shouldForceFullOpacity = useCallback(() => {
    return height > width || isSmallDevice;
  }, [height, isSmallDevice, width]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 10 && !isNewCustomerFieldsActive) {
        setNewCustomerFieldsActive(true);
        return;
      }

      if (window.scrollY <= 10 && isNewCustomerFieldsActive) {
        setNewCustomerFieldsActive(false);
        return;
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNewCustomerFieldsActive]);

  return (
    <Container maxW={'container.xl'}>
      <Stack
        w={'100%'}
        direction={isSmallDevice ? 'column' : 'row'}
        spacing={isSmallDevice ? '2rem' : '8rem'}
      >
        <Image
          src={'./hero-2.webp'}
          w={'100%'}
          h={height * 0.75}
          objectFit={'cover'}
          pt={'2rem'}
        />

        <VStack w={'100%'} spacing={'8rem'} pt={isSmallDevice ? 0 : '2rem'}>
          <CustomerLoginInput
            loading={isLoading}
            onLoginAttempt={onLoginAttempt}
            isSmallDevice={isSmallDevice}
          />

          <NewCustomerInput
            active={shouldForceFullOpacity() ? true : isNewCustomerFieldsActive}
            loading={isLoading}
            onCreateNewAccount={onCreateNewAccount}
            isSmallDevice={isSmallDevice}
          />
        </VStack>
      </Stack>
    </Container>
  );
}