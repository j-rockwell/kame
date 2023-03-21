import {IScalable} from "@/hooks/Dimensions";
import {useMemo, useState} from "react";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import {MobileNavigator} from "@/components/navigation/MobileNavigator";
import {getNavigatorData} from "@/data/Navigation";
import {useAuthContext} from "@/context/AuthContext";
import {ColorModeToggle} from "@/components/color-mode-toggle/ColorModeToggle";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import {
  Center,
  Image,
  IconButton,
  HStack,
  Text,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

interface INavigationProps extends IScalable {
  viewWidth: number;
}

export const Navigator = ({viewWidth, isSmallDevice}: INavigationProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const {account, isAuthenticated} = useAuthContext();
  const {colorMode} = useColorMode();
  const textColor = useColorModeValue('text.light', 'text.dark');
  const buttonBgColor = 'brand.red';
  const buttonHoverBgColor = '#ff5768';

  const navigationSpacing = {
    pt: 4,
    pb: 3,
  };

  const logoImageUrl = useMemo(() => {
    return `/logo-sideways-${colorMode}.png`;
  }, [colorMode]);

  if (isSmallDevice) {
    return (
      <>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{
                opacity: 0,
                x: viewWidth,
              }}
              animate={{
                display: 'flex',
                opacity: 1,
                x: 0,
              }}
              exit={{opacity: 0, x: viewWidth}}
              style={{
                position: 'relative',
                zIndex: 1,
              }}>
              <MobileNavigator isAuthenticated={isAuthenticated}/>
            </motion.div>
          )}
        </AnimatePresence>

        <Center w={'100%'} {...navigationSpacing}>
          <Link href={'/'}>
            <Image src={logoImageUrl} alt={'kame logo'} w={'10rem'} />
          </Link>

          <IconButton
            aria-label={'more options menu'}
            position={'absolute'}
            right={2}
            top={2}
            p={0}
            m={0}
            zIndex={2}
            size={'lg'}
            bgColor={'none'}
            icon={isExpanded ? <AiOutlineClose color={'white'} size={'1.25rem'} /> : <AiOutlineMenu size={'1.25rem'} color={'white'} />}
            onClick={() => setExpanded(!isExpanded)}
          />
        </Center>
      </>
    )
  }

  return (
    <Flex w={'100%'} py={'1rem'} px={'1rem'}>
      <Link href={'/'}>
        <Image src={logoImageUrl} alt={'kame logo'} w={'10rem'} />
      </Link>

      <HStack spacing={'2rem'} pl={'2rem'}>
        {/* don't render with auth here, we set it by hand */ getNavigatorData().map(item => (
          <Link key={item.name} href={item.href} passHref={true}>
            <Text
              color={textColor}
              fontWeight={'bold'}
              opacity={0.8}
              _hover={{opacity: 1}}
              transition={'all ease-in-out 0.2s'}>
              {item.name}
            </Text>
          </Link>
        ))}
      </HStack>

      <HStack position={'absolute'} top={4} right={4} spacing={'1rem'}>
        {isAuthenticated ? (
          <Text color={textColor}>
            Welcome back, <b>{account?.first_name}</b>
          </Text>
        ) : (
          <Button
            bgColor={buttonBgColor}
            color={'white'}
            fontWeight={'bold'}
            size={'md'}
            borderRadius={'full'}
            _hover={{
              bgColor: buttonHoverBgColor,
            }}>
            Join
          </Button>
        )}

        <ColorModeToggle />
      </HStack>
    </Flex>
  );
}