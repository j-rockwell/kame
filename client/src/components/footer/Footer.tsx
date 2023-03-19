import {useMemo} from "react";
import {getFooterData, getFooterSocials} from "@/data/Footer";
import {IScalable} from "@/hooks/Dimensions";
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  VStack,
  Text,
  HStack,
  Heading,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";

interface IFooterProps extends IScalable {}

export const Footer = ({isSmallDevice, isMediumDevice}: IFooterProps) => {
  const YEAR = new Date().getFullYear();
  const {colorMode} = useColorMode();

  const headerTextColor = useColorModeValue('brand.red', 'brand.red');
  const textColor = useColorModeValue('text.light', 'text.dark');
  const bgColor = useColorModeValue('backgroundAccent.light', 'background.dark');
  const borderColor = useColorModeValue('backgroundHighlight.light', 'backgroundHighlight.dark');

  /**
   * Returns color-responsive logo
   */
  const logoImageUrl = useMemo(() => {
    return `/logo-sideways-${colorMode}.png`;
  }, [colorMode]);

  /**
   * Returns grid layout depending on current screen dimensions
   */
  const columns = useMemo(() => {
    if (isSmallDevice) {
      return 1;
    }

    if (isMediumDevice) {
      return 2;
    }

    return 4;
  }, [isMediumDevice, isSmallDevice]);

  return (
    <Box w={'100%'} mt={'4rem'} py={'4rem'} bgColor={bgColor} borderTopWidth={1} borderColor={borderColor}>
      <Container maxW={'container.xl'}>
        <SimpleGrid columns={columns} spacingY={'2rem'} spacingX={'3rem'}>
          <VStack w={'100%'} alignItems={isSmallDevice ? 'center' : 'flex-start'} spacing={'1rem'}>
            <Image src={logoImageUrl} alt={'kame logo'} maxW={'16rem'} />

            <Text as={'i'} textAlign={isSmallDevice ? 'center' : 'left'} color={textColor}>
              “My omakase is about honoring the individual… Creating a personalized sushi experience is my true passion and the source of my inspiration.”
            </Text>

            <Text color={textColor}>
              &copy; {YEAR} Sushi Kame
            </Text>

            <HStack spacing={'1rem'}>
              {getFooterSocials().map(elem => (
                <Link key={elem.alt} href={elem.href}>
                  <IconButton
                    key={elem.alt}
                    aria-label={elem.alt}
                    as={elem.icon}
                    color={textColor}
                    size={'sm'}
                    bg={'none'}
                    _hover={{bg: 'none'}}
                  />
                </Link>
              ))}
            </HStack>
          </VStack>

          {getFooterData(colorMode).map(entry => (
            <VStack key={entry.title} w={'100%'} alignItems={isSmallDevice ? 'center' : 'flex-start'}>
              <Heading
                size={'sm'}
                textAlign={isSmallDevice ? 'center' : 'left'}
                color={headerTextColor}
                pb={'1rem'}>
                {entry.title}
              </Heading>

              {entry.subtitle && (
                <Box w={'100%'} pb={'1rem'} textAlign={isSmallDevice ? 'center' : 'left'}>
                  {entry.subtitle}
                </Box>
              )}

              {entry.items.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  color={textColor}>
                  {item.name}
                </Link>
              ))}
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}