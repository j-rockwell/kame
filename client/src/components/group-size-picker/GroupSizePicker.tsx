import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {HStack, IconButton, Square, Text, useColorModeValue} from "@chakra-ui/react";

interface IGroupSizePickerProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const GroupSizePicker = ({value, onIncrement, onDecrement}: IGroupSizePickerProps) => {
  const buttonBgColor = useColorModeValue('backgroundAccent.light', 'backgroundAccent.dark');
  const buttonPressedBgColor = useColorModeValue('backgroundAccent.light', 'backgroundAccent.dark');
  const bgHighlightColor = useColorModeValue('backgroundHighlight.light', 'backgroundHighlight.dark');

  const BUTTON_SIZE = '4rem';
  const buttonStyling = {
    w: BUTTON_SIZE,
    h: BUTTON_SIZE,
    p: 0,
    m: 0,
    bgColor: buttonBgColor,
    _active: {
      bgColor: buttonPressedBgColor,
    },
    _pressed: {
      bgColor: buttonPressedBgColor,
    }
  }

  return (
    <HStack spacing={0}>
      <IconButton
        aria-label={'decrease group size'}
        borderLeftRadius={12}
        borderRightRadius={0}
        icon={<AiOutlineLeft size={'1.25rem'} />}
        onClick={onDecrement}
        {...buttonStyling}
      />

      <Square size={BUTTON_SIZE} bgColor={bgHighlightColor}>
        <Text fontWeight={'semibold'} fontSize={'xl'}>{value}</Text>
      </Square>

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
}