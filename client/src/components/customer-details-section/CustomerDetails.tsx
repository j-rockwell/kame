import {NewCustomerInput} from "@/components/customer-new/NewCustomerInput";
import {CustomerLoginInput} from "@/components/customer-login/CustomerLoginInput";
import {useCallback, useEffect, useState} from "react";
import {ReservationSummaryDescription} from "@/components/reservation-summary/ReservationSummaryDescription";
import {useReservationContext} from "@/context/ReservationContext";
import {IScalable, useDimensions} from "@/hooks/Dimensions";
import {LoginAccountData, NewAccountData} from "@/models/Account";
import {Container, Image, Stack, VStack} from "@chakra-ui/react";

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
  const {groupSize, groupDate, groupTime} = useReservationContext();
  const {width, height} = useDimensions();
  const [isNewCustomerFieldsActive, setNewCustomerFieldsActive] = useState(false);

  /**
   * Override func to prevent opacity errors on vertical screens or
   * mobile devices.
   */
  const shouldForceFullOpacity = useCallback(() => {
    return height > width || isSmallDevice;
  }, [height, isSmallDevice, width]);

  /**
   * Subscribes to scroll events and triggers opacity changes
   */
  useEffect(() => {
    function handleScroll() {
      if (shouldForceFullOpacity()) {
        if (!isNewCustomerFieldsActive) {
          setNewCustomerFieldsActive(true);
        }

        return;
      }

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
  }, [isNewCustomerFieldsActive, shouldForceFullOpacity]);

  return (
    <Container maxW={'container.xl'}>
      <Stack
        w={'100%'}
        direction={isSmallDevice ? 'column' : 'row'}
        spacing={isSmallDevice ? '2rem' : '8rem'}>
        <VStack>
          <Image
            src={'./hero-2.webp'}
            w={'100%'}
            h={height * 0.75}
            mb={'1rem'}
            objectFit={'cover'}
            pt={isSmallDevice ? 0 : '2rem'}
          />

          <ReservationSummaryDescription
            isSmallDevice={isSmallDevice}
            groupSize={groupSize}
            groupDate={groupDate}
            groupTime={groupTime}
          />
        </VStack>

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