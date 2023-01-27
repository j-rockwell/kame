import {Box, Heading, Text, useColorModeValue} from "@chakra-ui/react";

interface IStepProps {
  title: string;
  subtitle?: string;
  value: number;
  center?: boolean;
}

export const Step = ({title, subtitle, value, center}: IStepProps) => {
  const textColor = useColorModeValue('text.light', 'text.dark');

  return (
    <Box>
      <Heading
        size={'sm'}
        fontWeight={'normal'}
        color={textColor}
        textAlign={center ? 'center' : 'left'}>
        Step #{value}
      </Heading>

      <Heading
        size={'md'}
        color={textColor}
        textAlign={center ? 'center' : 'left'}>
        {title}
      </Heading>

      {subtitle && (
        <Text
          mt={2}
          fontSize={'sm'}
          color={textColor}
          textAlign={center ? 'center' : 'left'}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
}