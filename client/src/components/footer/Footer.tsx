import {Box, Heading, Stack, Text, useColorMode} from "@chakra-ui/react";
import {useScreenWidth} from "@/hooks/Width";
import {useMemo} from "react";

export type FooterColumnContent = {
  title: string;
  items: FooterColumnItem[];
}

export type FooterColumnItem = {
  name: string;
  href: string;
}

interface IFooterProps {
  content: FooterColumnContent[];
}

export const Footer = ({content}: IFooterProps) => {
  const {colorMode} = useColorMode();
  const width = useScreenWidth();

  const isSmallDevice = useMemo(() => {
    return width <= 768;
  }, [width]);

  return (
    <Box
      w={'100%'}
      py={'4rem'}
      bgColor={`backgroundAccent.${colorMode}`}>
      <Stack
        w={'100%'}
        px={'4rem'}
        direction={isSmallDevice ? 'column' : 'row'}>
        {content.map(cont => (
          <Box key={cont.title} w={'100%'}>
            <Heading size={'sm'}>
              {cont.title}
            </Heading>

            {cont.items.map(item => (
              <Text key={item.name}>{item.name}</Text>
            ))}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}