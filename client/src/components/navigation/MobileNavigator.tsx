import {getNavigatorData} from "@/data/Navigation";
import {ColorModeToggle} from "@/components/color-mode-toggle/ColorModeToggle";
import {Link, Square, Text, VStack, Box, useColorModeValue} from "@chakra-ui/react";

interface IMobileNavigatorProps {
  isAuthenticated: boolean;
}

export const MobileNavigator = ({isAuthenticated}: IMobileNavigatorProps) => {
  const bgColor = useColorModeValue('backgroundAccent.light', 'backgroundAccent.dark');
  const buttonBgColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('text.light', 'text.dark');

  const entryStyling = {
    py: '1rem',
    bgColor: buttonBgColor,
    borderRadius: 12,
  }

  return (
    <VStack
      position={'absolute'}
      top={0}
      left={0}
      w={'100%'}
      py={'4rem'}
      px={'1rem'}
      bgColor={bgColor}
      shadow={'xl'}
      spacing={'1rem'}>
      {getNavigatorData(isAuthenticated).map(item => (
        <Link key={item.name} href={item.href} w={'100%'} _hover={{textDecoration: 'none'}}>
          <Square {...entryStyling}>
            <Text color={textColor} fontSize={'xl'} fontWeight={'bold'}>{item.name}</Text>
          </Square>
        </Link>
      ))}

      <Box position={'absolute'} bottom={5} right={4}>
        <ColorModeToggle />
      </Box>
    </VStack>
  );
}