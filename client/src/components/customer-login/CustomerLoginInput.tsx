import {useCallback, useState} from "react";
import {isEmailRegexp} from "@/util/Validate";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {IScalable} from "@/hooks/Dimensions";
import {LoginAccountData} from "@/models/Account";
import {
  Box, Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const INITIAL_DATA: InputData = {value: '', error: undefined};

interface ICustomerLoginInputProps extends IScalable {
  loading: boolean;
  onLoginAttempt: (d: LoginAccountData) => void;
}

type InputData = {
  value: string;
  error?: string;
}

type InputField = 'email_address' | 'password';

export const CustomerLoginInput = ({onLoginAttempt, isSmallDevice}: ICustomerLoginInputProps) => {
  const [email, setEmail] = useState<InputData>(INITIAL_DATA);
  const [password, setPassword] = useState<InputData>(INITIAL_DATA);
  const [showPassword, setShowPassword] = useState(false);

  const textColor = useColorModeValue('text.light', 'text.dark');
  const buttonBgColor = useColorModeValue('info.light', 'info.dark');

  const inputStyling = {
    borderRadius: 12,
  }

  /**
   * Validates input, setting error states if caught
   */
  const handleValidate = useCallback(() => {
    let valid = true;

    if (email.value.length < 3 || email.value.length > 64) {
      setEmail({value: email.value, error: 'Email must be 3-64 characters'});
      valid = false;
    }

    if ((email.value.length >= 3 && email.value.length <= 64) && !isEmailRegexp(email.value)) {
      setEmail({value: email.value, error: 'Invalid email address'});
      valid = false;
    }

    if (password.value.length < 8 || password.value.length > 32) {
      setPassword({value: password.value, error: 'Password must be 8-32 characters'});
      valid = false;
    }

    return valid;
  }, [email.value, password.value]);

  /**
   * Handles marshalling fields in to a login attempt type and performs the request
   */
  const handleLoginAttempt = useCallback(() => {
    const result = handleValidate();

    if (!result) {
      console.debug('encountered input errors while attempting to submit');
      return;
    }

    onLoginAttempt({emailAddress: email.value, password: password.value});
  }, [email.value, onLoginAttempt, password.value]);

  /**
   * Handles updating the fields for email or password with the option to wipe errors for the specified field
   */
  const handleDataUpdate = useCallback((field: InputField, value: string, clearErrors?: boolean) => {
    switch (field) {
      case "email_address":
        setEmail({value: value, error: clearErrors ? undefined : email.error});
        break;
      case "password":
        setPassword({value: value, error: clearErrors ? undefined : password.error});
        break;
    }
  }, [email.error, password.error]);

  return (
    <Box w={'100%'} maxW={'48rem'}>
      <Heading size={'md'} color={textColor}>Returning Customer</Heading>

      <VStack mt={'2rem'}>
        <FormControl isInvalid={email.error !== undefined}>
          <FormLabel>Email</FormLabel>

          <Input
            type={'email'}
            onChange={e => handleDataUpdate('email_address', e.target.value, true)}
            {...inputStyling}
          />

          {email.error && <FormErrorMessage>{email.error}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={password.error !== undefined} pt={'2rem'}>
          <FormLabel>Password</FormLabel>

          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              onChange={e => handleDataUpdate('password', e.target.value, true)}
              {...inputStyling}
            />

            <InputRightElement>
              <IconButton
                aria-label={'show password'}
                size={'sm'}
                borderRadius={12}
                icon={showPassword ? <AiFillEyeInvisible size={'1.25rem'} /> : <AiFillEye size={'1.25rem'} />}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>

          {password.error && <FormErrorMessage>{password.error}</FormErrorMessage>}
        </FormControl>

        <VStack w={'100%'} pt={'2rem'} spacing={'1rem'}>
          <Button size={'lg'} w={'100%'} color={'white'} bgColor={buttonBgColor} onClick={handleLoginAttempt}>
            Sign in
          </Button>

          <Button size={'lg'} colorScheme={'gray'} color={textColor} w={'100%'}>
            Forgot Password
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}