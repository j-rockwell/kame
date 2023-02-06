import {Box, Heading, Text, useColorModeValue} from "@chakra-ui/react";

interface IBookingContainerHeadingProps {
  isSmallDevice: boolean;
  children: string;
}

export const BookingContainerHeading = ({isSmallDevice, children}: IBookingContainerHeadingProps) => {
  const SPACING = 8;
  const textColor = useColorModeValue('text.light', 'text.dark');

  return (
    <Box
      w={'100%'}
      pb={SPACING}
      mb={SPACING}
      borderBottomWidth={1}
      borderColor={'white'}
    >
      <Heading
        color={textColor}
        textAlign={isSmallDevice ? 'center' : 'left'}
        size={'2xl'}
        fontWeight={'normal'}>
        {children}
      </Heading>

      <Text textAlign={isSmallDevice ? 'center' : 'left'} mt={SPACING}>
        The dining experience at Omakase Room by Kame is built around a relationship of trust and spontaneity between Chef and each diner. Chef’s curated omakase offerings change often, highlighting a diversity of ingredients, preparations, and the range of textures.
      </Text>
    </Box>
  )
}