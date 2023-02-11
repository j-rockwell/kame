import {default as NextLink} from 'next/link';
import {Box, Link, Text, useColorModeValue} from "@chakra-ui/react";

interface IReserveButtonProps {
  disclaimer?: string;
  children: string;
}

export const ReserveButton = ({disclaimer, children}: IReserveButtonProps) => {
  const bgColor = useColorModeValue('info.light', 'info.dark');
  const mutedTextColor = useColorModeValue('textMuted.light', 'textMuted.dark');

  return (
    <Box w={'100%'}>
      <NextLink href={'/reserve'} passHref>
        <Link
          as={'button'}
          w={'100%'}
          py={2}
          fontSize={'xl'}
          fontWeight={'bold'}
          _hover={{textDecoration: 'none'}}
          color={'white'}
          bgColor={bgColor}
          borderRadius={12}>
          {children}
        </Link>
      </NextLink>

      {disclaimer && (
        <Text
          textAlign={'center'}
          fontSize={'sm'}
          color={mutedTextColor}
          mt={4}>
          {disclaimer}
        </Text>
      )}
    </Box>
  );
}