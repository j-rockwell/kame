import {IScalable} from "@/hooks/Dimensions";
import {getFaqData} from "@/data/Faq";
import {AiFillCaretDown} from "react-icons/ai";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Image,
  Text,
  VStack,
  Icon,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

interface IFaqSectionProps extends IScalable {}

export const FaqSection = ({
  isSmallDevice,
  isMediumDevice
}: IFaqSectionProps) => {
  const textColor = useColorModeValue('text.light', 'text.dark');
  const mutedTextColor = useColorModeValue('gray.600', 'textMuted.dark');
  const accordionSelectedColor = useColorModeValue('backgroundHighlight.light', 'backgroundHighlight.dark');

  return (
    <Box w={'100%'} mt={'0.5rem'}>
      <Image
        src={'/hero-4.webp'}
        alt={'kame background'}
        w={'100%'}
        h={'32rem'}
        objectFit={'cover'}
        objectPosition={'center'}
      />

      <VStack
        mt={'1rem'}
        spacing={'0.5rem'}
        alignItems={'flex-start'}>
        <Heading color={textColor} size={'2xl'}>Frequently Asked Questions</Heading>
        <Heading color={mutedTextColor} size={'md'} fontWeight={'normal'}>Learn more about Sushi Kame before your visit</Heading>
      </VStack>

      <VStack w={'100%'} mt={'2rem'} spacing={'2rem'}>
        {getFaqData().map(entry => (
          <Box key={entry.title} w={'100%'}>
            <Heading size={'md'}>{entry.title}</Heading>

            <Accordion allowMultiple={true} mt={'1rem'}>
              {entry.items.map(item => (
                <AccordionItem key={item.question}>
                  <h2>
                    <AccordionButton _expanded={{ bg: accordionSelectedColor }}>
                      <HStack w={'100%'} justifyContent={'space-between'}>
                        <Text textAlign={'left'} fontSize={'lg'} color={textColor} fontWeight={'semibold'}>
                          {item.question}
                        </Text>

                        <Icon as={AiFillCaretDown} color={textColor} size={'1rem'} />
                      </HStack>
                    </AccordionButton>
                  </h2>

                  <AccordionPanel>
                    {item.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}