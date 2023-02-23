import {useCallback, useMemo} from "react";
import {GroupSizePicker} from "@/components/group-size-picker/GroupSizePicker";
import {Box, Heading, useColorModeValue} from "@chakra-ui/react";

interface IGroupSizeSectionProps {
  size: number;
  setSize: (v: number) => void;
  isSmallDevice: boolean;
}

export const GroupSizeSection = ({size, setSize, isSmallDevice}: IGroupSizeSectionProps) => {
  const infoColor = useColorModeValue('info.light', 'info.dark');
  const warningColor = useColorModeValue('warning.light', 'warning.dark');
  const textColor = useColorModeValue('text.light', 'text.dark');

  /**
   * Returns true if the party size is considered 'large' and renders a warning
   * that the user should call the restaurant before making the reservation
   */
  const isLargeParty = useMemo(() => {
    return size >= 6;
  }, [size]);

  /**
   * Handles incrementing the group size by 1
   */
  const onIncrement = useCallback(() => {
    console.debug('onIncrement');
    if (size >= 6) {
      return;
    }

    setSize(size + 1)
    console.debug('setSize (incr.)');
  }, [size, setSize]);

  /**
   * Handles decrementing the group size by 1
   */
  const onDecrement = useCallback(() => {
    console.debug('onDecrement');
    if (size <= 1) {
      return;
    }

    setSize(size - 1);
    console.debug('setSize (decr.)');
  }, [size, setSize]);

  return (
    <Box w={'100%'}>
      <Heading
        color={textColor}
        textAlign={isSmallDevice ? 'center' : 'left'}
        size={'lg'}
        mb={8}>
        How many guests will be attending?
      </Heading>

      <GroupSizePicker value={size} onIncrement={onIncrement} onDecrement={onDecrement} />
    </Box>
  );
}