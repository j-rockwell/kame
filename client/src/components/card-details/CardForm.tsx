import {VStack, FormControl, FormLabel, HStack, Input, Heading, Select} from "@chakra-ui/react";
import {IScalable} from "@/hooks/Dimensions";
import {getStates} from "@/models/State";
import {getMonths, getYears} from "@/models/Expiration";
import {useCallback} from "react";
import {getCarrier} from "@/models/Card";

interface ICardFormProps extends IScalable {}

export const CardForm = ({isSmallDevice}: ICardFormProps) => {
  const getCardCarrier = useCallback((s: string) => {
    if (!s || s.length < 1) {
      return undefined;
    }

    return getCarrier(s);
  }, []);

  return (
    <VStack w={'100%'} spacing={'2rem'} pt={'2rem'} alignItems={'flex-start'}>
      <Heading size={'md'}>Card Information</Heading>

      <FormControl>
        <FormLabel>Name on Card</FormLabel>
        <Input />
      </FormControl>

      <FormControl>
        <FormLabel>Card Number</FormLabel>
        <Input />
      </FormControl>

      <HStack w={'100%'}>
        <FormControl w={'40%'}>
          <FormLabel>Month</FormLabel>
          <Select>
            {getMonths().map(month => (
              <option key={month.name} value={month.numeric}>{month.name} ({month.numeric})</option>
            ))}
          </Select>
        </FormControl>

        <FormControl w={'40%'}>
          <FormLabel>Year</FormLabel>
          <Select>
            {getYears(10).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl w={'20%'}>
          <FormLabel>CVV</FormLabel>
          <Input />
        </FormControl>
      </HStack>

      <Heading size={'md'} pt={'2rem'}>Billing Information</Heading>

      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input />
      </FormControl>

      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input />
      </FormControl>

      <FormControl>
        <FormLabel>Address</FormLabel>
        <Input />
      </FormControl>

      <HStack w={'100%'}>
        <FormControl w={'60%'}>
          <FormLabel>City</FormLabel>
          <Input />
        </FormControl>

        <FormControl w={'20%'}>
          <FormLabel>Postal Code</FormLabel>
          <Input />
        </FormControl>

        <FormControl w={'20%'}>
          <FormLabel>State</FormLabel>
          <Select>
            {getStates().map(state => (
              <option key={state.name}>{state.abbreviation}</option>
            ))}
          </Select>
        </FormControl>
      </HStack>
    </VStack>
  );
}