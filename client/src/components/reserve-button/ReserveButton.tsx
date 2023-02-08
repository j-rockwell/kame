import {Box, Button, Text, useColorModeValue} from "@chakra-ui/react";

interface IReserveButtonProps {
  disclaimer?: string;
  onClick: () => void;
  children: string;
}

export const ReserveButton = ({disclaimer, onClick, children}: IReserveButtonProps) => {
  const bgColor = useColorModeValue('info.light', 'info.dark');
  const mutedTextColor = useColorModeValue('textMuted.light', 'textMuted.dark');

  return (
    <Box w={'100%'}>
      <Button
        onClick={onClick}
        size={'lg'}
        fontSize={'xl'}
        w={'100%'}
        bgColor={bgColor}
        borderRadius={12}>
        {children}
      </Button>

      {disclaimer && (
        <Text
          textAlign={'center'}
          fontSize={'sm'}
          color={mutedTextColor}
          mt={4}
        >
          {disclaimer}
        </Text>
      )}
    </Box>
  );
}