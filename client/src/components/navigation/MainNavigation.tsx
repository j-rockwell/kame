import {useMemo} from "react";
import {AiOutlineLeft} from "react-icons/ai";
import {Center, HStack, Icon, Image, Link, Text, useColorMode} from '@chakra-ui/react';

export const Navigator = ({}) => {
  const {colorMode} = useColorMode();

  const logoImageUrl = useMemo(() => {
    return `./logo-sideways-${colorMode}.png`;
  }, [colorMode]);

  return (
    <Center w={'100%'} bgColor={`background.${colorMode}`} py={4}>
      <Link
        href={'http://sushikame.com/'}
        position={'absolute'}
        left={4}
        top={6}>
        <HStack>
          <Icon as={AiOutlineLeft} color={`text.${colorMode}`} />
          <Text>Back</Text>
        </HStack>
      </Link>

      <Link href={'http://sushikame.com/'}>
        <Image src={logoImageUrl} w={'12rem'} />
      </Link>
    </Center>
  )
}