import {Box, Image, useColorMode} from "@chakra-ui/react";

export const HeroBanner = ({}) => {
  const {colorMode} = useColorMode();

  return (
    <Box w={'100%'} h={'32rem'}>
      <Image
        src={'./hero-1.webp'}
        w={'100%'}
        h={'100%'}
        objectFit={'cover'}
        objectPosition={'left'}
      />
    </Box>
  );
}