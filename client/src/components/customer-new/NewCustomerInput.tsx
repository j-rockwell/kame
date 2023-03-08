import {useCallback, useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {IScalable} from "@/hooks/Dimensions";
import {NewAccountData} from "@/models/Account";
import {motion} from "framer-motion";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  Button,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

const INITIAL_DATA: InputData = {value: '', error: undefined};

interface INewCustomerInputProps extends IScalable {
  active: boolean;
  loading: boolean;
  onCreateNewAccount: (d: NewAccountData) => void;
}

type InputData = {
  value: string;
  error?: string;
}

type InputField =
  'first_name'    |
  'last_name'     |
  'email_address' |
  'phone_left'    |
  'phone_middle'  |
  'phone_right'   |
  'password'      |
  'confirm_password';

export const NewCustomerInput = ({
  active,
  loading,
  onCreateNewAccount,
  isSmallDevice
}: INewCustomerInputProps) => {
  const [firstName, setFirstName] = useState<InputData>(INITIAL_DATA);
  const [lastName, setLastName] = useState<InputData>(INITIAL_DATA);
  const [email, setEmail] = useState<InputData>(INITIAL_DATA);
  const [phoneLeft, setPhoneLeft] = useState<InputData>(INITIAL_DATA);
  const [phoneMiddle, setPhoneMiddle] = useState<InputData>(INITIAL_DATA);
  const [phoneRight, setPhoneRight] = useState<InputData>(INITIAL_DATA);
  const [password, setPassword] = useState<InputData>(INITIAL_DATA);
  const [confirmPassword, setConfirmPassword] = useState<InputData>(INITIAL_DATA);
  const [showPassword, setShowPassword] = useState(false);

  const textColor = useColorModeValue('text.light', 'text.dark');
  const buttonBgColor = useColorModeValue('info.light', 'info.dark');

  const inputStyling = {
    borderRadius: 12,
  }

  /**
   * Returns true if any of the input fields are currently marked with an error
   */
  const isInvalid = useCallback(() => {
    return firstName.error || lastName.error || email.error || password.error || confirmPassword.error;
  }, [confirmPassword.error, email.error, firstName.error, lastName.error, password.error]);

  /**
   * Merges all errors for phone parts in to a single string
   */
  const getMergedPhoneErrors = useCallback(() => {
    let result = [];

    if (phoneLeft.error) {
      result.push(phoneLeft.error);
    }

    if (phoneMiddle.error) {
      result.push(phoneMiddle.error);
    }

    if (phoneRight.error) {
      result.push(phoneRight.error);
    }

    return result.join(', ');
  }, [phoneLeft, phoneMiddle, phoneRight]);

  /**
   * Validates inputs, setting error states if caught
   */
  const handleValidate = useCallback(() => {
    let valid = true;

    if (firstName.value.length < 2 || firstName.value.length > 32) {
      setFirstName({value: firstName.value, error: 'Name must be 2-32 characters'});
      valid = false;
    }

    if (lastName.value.length < 2 || lastName.value.length > 32) {
      setLastName({value: lastName.value, error: 'Name must be 2-32 characters'});
      valid = false;
    }

    if (email.value.length < 3 || email.value.length > 64) {
      setEmail({value: email.value, error: 'Email address must be 3-64 characters'});
      valid = false;
    }

    if (phoneLeft.value.length !== 3) {
      setPhoneLeft({value: phoneLeft.value, error: 'Invalid area code'});
      valid = false;
    }

    if (phoneMiddle.value.length !== 3) {
      setPhoneMiddle({value: phoneMiddle.value, error: 'Invalid middle part'});
      valid = false;
    }

    if (phoneRight.value.length !== 4) {
      setPhoneRight({value: phoneRight.value, error: 'Invalid end part'});
      valid = false;
    }

    if (password.value.length < 6 || password.value.length > 32) {
      setPassword({value: password.value, error: 'Password must be 6-32 characters'});
      valid = false;
    }

    if (confirmPassword.value !== password.value) {
      setConfirmPassword({value: confirmPassword.value, error: 'Passwords do not match'});
      valid = false;
    }

    return valid;
  }, [confirmPassword.value, email.value, firstName.value, lastName.value, password.value, phoneLeft.value, phoneMiddle.value, phoneRight.value]);

  /**
   * Validates errors and submits if no issues are found
   */
  const handleValidateAndSubmit = useCallback(() => {
    const result = handleValidate();

    if (!result) {
      console.debug('encountered input errors while attempting to submit')
      return;
    }

    onCreateNewAccount({
      firstName: firstName.value,
      lastName: lastName.value,
      emailAddress: email.value,
      phone: phoneLeft.value + phoneMiddle.value + phoneRight.value,
      password: password.value
    });
  }, [email.value, firstName.value, handleValidate, lastName.value, onCreateNewAccount, password.value, phoneLeft.value, phoneMiddle.value, phoneRight.value]);

  /**
   * Handles elegantly updating state and optionally wiping errors
   */
  const handleDataUpdate = useCallback((field: InputField, value: string, clearErrors?: boolean) => {
    // quick fix for number only field with numbers
    if (field.startsWith('phone_') && (Number.isNaN(value) || Number.isNaN(parseInt(value)))) {
      console.debug('skipped');
      return;
    }

    switch (field) {
      case "first_name":
        setFirstName({value: value, error: clearErrors ? undefined : firstName.error});
        break;
      case "last_name":
        setLastName({value: value, error: clearErrors ? undefined : lastName.error});
        break;
      case "email_address":
        setEmail({value: value, error: clearErrors ? undefined : email.error});
        break;
      case "phone_left":
        setPhoneLeft({value: value, error: clearErrors ? undefined : phoneLeft.error});
        break;
      case "phone_middle":
        setPhoneMiddle({value: value, error: clearErrors ? undefined : phoneMiddle.error});
        break;
      case "phone_right":
        setPhoneRight({value: value, error: clearErrors ? undefined : phoneRight.error});
        break;
      case "password":
        setPassword({value: value, error: clearErrors ? undefined : password.error});
        break;
      case "confirm_password":
        setConfirmPassword({value: value, error: clearErrors ? undefined : confirmPassword.error});
        break;
    }
  }, [confirmPassword.error, email.error, firstName.error, lastName.error, password.error, phoneLeft.error, phoneMiddle.error, phoneRight.error]);

  return (
    <motion.div
      animate={{opacity: active ? 1 : 0.25}}
      style={{
        width: '100%',
        maxWidth: '48rem',
      }}
    >
      <Heading size={'md'} color={textColor}>New Customer</Heading>

      <VStack spacing={'2rem'} mt={'2rem'}>
        <FormControl isInvalid={firstName.error !== undefined && firstName.error?.length > 0}>
          <FormLabel>First Name</FormLabel>

          <Input
            onChange={e => handleDataUpdate('first_name', e.target.value, true)}
            {...inputStyling}
          />

          {firstName.error && <FormErrorMessage>{firstName.error}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={lastName.error !== undefined && lastName.error?.length > 0}>
          <FormLabel>Last Name</FormLabel>

          <Input
            onChange={e => handleDataUpdate('last_name', e.target.value, true)}
            {...inputStyling}
          />

          {lastName.error && <FormErrorMessage>{lastName.error}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={email.error !== undefined && email.error?.length > 0}>
          <FormLabel>Email</FormLabel>

          <Input
            onChange={e => handleDataUpdate('email_address', e.target.value, true)}
            {...inputStyling}
          />

          {email.error && <FormErrorMessage>{email.error}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={
          phoneLeft.error !== undefined ||
          phoneMiddle.error !== undefined ||
          phoneRight.error !== undefined
        }>
          <FormLabel>Phone</FormLabel>

          <HStack>
            <FormControl w={'25%'} isInvalid={phoneLeft.error !== undefined}>
              <Input
                placeholder={'123'}
                maxLength={3}
                onChange={e => handleDataUpdate('phone_left', e.target.value, true)}
                {...inputStyling}
              />
            </FormControl>

            <FormControl w={'25%'} isInvalid={phoneMiddle.error !== undefined}>
              <Input
                placeholder={'456'}
                maxLength={3}
                onChange={e => handleDataUpdate('phone_middle', e.target.value, true)}
                {...inputStyling}
              />
            </FormControl>

            <FormControl w={'50%'} isInvalid={phoneRight.error !== undefined}>
              <Input
                placeholder={'7890'}
                maxLength={4}
                onChange={e => handleDataUpdate('phone_right', e.target.value, true)}
                {...inputStyling}
              />
            </FormControl>
          </HStack>

          {(phoneLeft.error !== undefined || phoneMiddle.error !== undefined || phoneRight.error !== undefined) && (
            <FormErrorMessage>{getMergedPhoneErrors()}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={password.error !== undefined && password.error?.length > 0}>
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

        <FormControl isInvalid={confirmPassword.error !== undefined && confirmPassword.error?.length > 0}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            onChange={e => handleDataUpdate('confirm_password', e.target.value, true)}
            {...inputStyling}
          />

          {confirmPassword.error && <FormErrorMessage>{confirmPassword.error}</FormErrorMessage>}
        </FormControl>

        <Button
          size={'lg'}
          w={'100%'}
          fontWeight={'bold'}
          textColor={'white'}
          alignSelf={'flex-start'}
          onClick={() => handleValidateAndSubmit()}
          borderRadius={12}
          bgColor={buttonBgColor}
          isLoading={loading}>
          Create Account
        </Button>
      </VStack>
    </motion.div>
  );
}