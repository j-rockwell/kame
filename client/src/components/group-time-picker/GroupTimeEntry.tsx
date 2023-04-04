import {
  Heading,
  Square,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

interface IGroupTimeEntryProps {
  title: string;
  subtitle: string;
  isSelected: boolean;
  isMobile: boolean;
  onClick: () => void;
}

export const GroupTimeEntry = ({
  title,
  subtitle,
  isSelected,
  isMobile,
  onClick,
}: IGroupTimeEntryProps) => {
  const borderColor = useColorModeValue('textMuted.light', 'textMuted.dark');
  const selectedBgColor = useColorModeValue('info.light', 'info.dark');
  const textColor = useColorModeValue('text.light', 'text.dark');
  const selectedTextColor = 'white';

  return (
    <Square
      onClick={onClick}
      cursor={isSelected ? 'auto' : 'pointer'}
      size={isMobile ? '100%' : '50%'}
      bgColor={isSelected ? selectedBgColor : 'none'}
      py={8}
      borderRadius={12}
      borderWidth={isSelected ? 0 : 1}
      borderColor={borderColor}>
      <VStack spacing={-0.5}>
        <Heading
          color={isSelected ? selectedTextColor : textColor}
          textAlign={'center'}
          size={'lg'}>
          {title}
        </Heading>

        <Text
          color={isSelected ? selectedTextColor : textColor}
          textAlign={'center'}>
          {subtitle}
        </Text>
      </VStack>
    </Square>
  );
};
