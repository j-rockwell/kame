import {useScreenWidth} from "@/hooks/Width";
import {useCallback, useMemo} from "react";
import {GroupSizePicker} from "@/components/group-size-picker/GroupSizePicker";
import {Step} from "@/components/step/Step";
import {AnimatePresence, motion} from "framer-motion";
import {PHONE_NUMBER_RAW} from "@/util/Constants";
import {Box, Link, Stack, Text, useColorModeValue} from "@chakra-ui/react";

interface IGroupSizeSectionProps {
  size: number;
  setSize: (v: number) => void;
}

export const GroupSizeSection = ({size, setSize}: IGroupSizeSectionProps) => {
  const WIDTH = useScreenWidth();

  const infoColor = useColorModeValue('info.light', 'info.dark');
  const warningColor = useColorModeValue('warning.light', 'warning.dark');

  /**
   * Returns true if this component is being viewed on a smaller screen
   */
  const isSmallDevice = useMemo(() => {
    return WIDTH <= 768;
  }, [WIDTH]);

  /**
   * Returns true if the party size is considered 'large' and renders a warning
   * that the user should call the restaurant before making the reservation
   */
  const isLargeParty = useMemo(() => {
    return size >= 10;
  }, [size]);

  /**
   * Handles incrementing the group size by 1
   */
  const onIncrement = useCallback(() => {
    console.debug('onIncrement');
    if (size >= 10) {
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
      <Stack
        spacing={isSmallDevice ? '2rem' : '4rem'}
        direction={isSmallDevice ? 'column' : 'row'}
        alignItems={isSmallDevice ? 'center' : 'left'}>
        <Box maxW={isSmallDevice ? '100%' : '25%'}>
          <Step
            title={'Party Size'}
            value={1}
            center={isSmallDevice}
          />
        </Box>

        <GroupSizePicker
          value={size}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </Stack>

      <AnimatePresence>
        {isLargeParty && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <Text
              textAlign={isSmallDevice ? 'center' : 'left'}
              color={warningColor}
              mt={'2rem'}>
              For groups larger than 10 members please <Link href={`tel:${PHONE_NUMBER_RAW}`} color={infoColor}>call us</Link>.
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}