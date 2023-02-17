import {useCallback, useMemo} from "react";
import {AiOutlineLeft} from "react-icons/ai";
import {BsFillSunFill, BsFillMoonFill} from "react-icons/bs";
import {default as NextLink} from 'next/link';
import {Center, HStack, Icon, Image, Link, Switch, Text, useColorMode} from '@chakra-ui/react';

interface INavigatorProps {
  backButton?: {
    text: string;
    href: string;
  }
}

export const Navigator = ({backButton}: INavigatorProps) => {
  const {colorMode, setColorMode} = useColorMode();

  const logoImageUrl = useMemo(() => {
    return `./logo-sideways-${colorMode}.png`;
  }, [colorMode]);

  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]);

  return (
    <Center w={'100%'} bgColor={`background.${colorMode}`} pt={4} pb={3}>
      {backButton && (
        <Link
          as={NextLink}
          href={backButton.href}
          position={'absolute'}
          left={4}
          top={6}>
          <HStack>
            <Icon as={AiOutlineLeft} />
            <Text>{backButton.text}</Text>
          </HStack>
        </Link>
      )}

      <Link href={'http://sushikame.com/'}>
        <Image src={logoImageUrl} alt={'kame logo'} w={'10rem'} />
      </Link>

      <HStack position={'absolute'} top={6} right={4}>
        <Icon as={BsFillSunFill} color={`text.${colorMode}`} />

        <Switch
          id={'colormode'}
          size={'md'}
          colorScheme={'gray'}
          isChecked={colorMode === 'dark'}
          onChange={toggleColorMode}
        />

        <Icon as={BsFillMoonFill} color={`text.${colorMode}`} />
      </HStack>
    </Center>
  )
}