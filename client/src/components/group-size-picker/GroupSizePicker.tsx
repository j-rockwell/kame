import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import {
  Center,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

interface IGroupSizePickerProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const GroupSizePicker = ({
  value,
  onIncrement,
  onDecrement,
}: IGroupSizePickerProps) => {
  const buttonBgColor = useColorModeValue('gray.50', 'gray.800');
  const buttonPressedBgColor = useColorModeValue('white', 'gray.900');
  const bgHighlightColor = useColorModeValue('gray.50', 'gray.800');

  const buttonStyling = {
    w: '33%',
    h: '4rem',
    p: 0,
    m: 0,
    bgColor: buttonBgColor,
    _active: {
      bgColor: buttonPressedBgColor,
    },
    _pressed: {
      bgColor: buttonPressedBgColor,
    },
  };

  return (
    <HStack spacing={0} w={'100%'}>
      <IconButton
        aria-label={'decrease group size'}
        borderLeftRadius={12}
        borderRightRadius={0}
        icon={<AiOutlineLeft size={'1.25rem'} />}
        onClick={onDecrement}
        {...buttonStyling}
      />

      <Center width={'33%'} h={'4rem'} bgColor={bgHighlightColor}>
        <Text fontWeight={'semibold'} fontSize={'xl'}>
          {value}
        </Text>
      </Center>

      <IconButton
        aria-label={'increase group size'}
        borderRightRadius={12}
        borderLeftRadius={0}
        icon={<AiOutlineRight size={'1.25rem'} />}
        onClick={onIncrement}
        {...buttonStyling}
      />
    </HStack>
  );
};
