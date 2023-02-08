import {IScalable} from "@/hooks/Dimensions";
import {Box, FormControl, FormLabel, Heading, Input, useColorModeValue, VStack} from "@chakra-ui/react";
import {useState} from "react";

interface ICustomerDetailsLogin extends IScalable {

}

export const CustomerDetailsLogin = ({isSmallDevice}: ICustomerDetailsLogin) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const borderColor = useColorModeValue('black', 'white');

  return (
    <Box
      w={'100%'}
      pb={'3rem'}
      borderBottomWidth={1}
      borderBottomColor={borderColor}>
      <Heading
        textAlign={isSmallDevice ? 'center' : 'left'}
        size={'md'}
        fontWeight={'normal'}>
        Existing customer?
      </Heading>

      <VStack spacing={'1rem'} mt={'2rem'}>
        <FormControl>
          <FormLabel>
            Email
          </FormLabel>

          <Input
            placeholder={'johnsmith@email.com'}
          />
        </FormControl>

        <FormControl>
          <FormControl>
            Password
          </FormControl>

          <Input
            placeholder={'Password'}
          />
        </FormControl>
      </VStack>
    </Box>
  );
}