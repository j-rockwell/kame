import {IScalable} from '@/hooks/Dimensions';
import {
  Heading,
  Square,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

interface IMenuEntryProps extends IScalable {
  title: string;
  subtitle?: string;
  isSelected: boolean;
  onClick: () => void;
}

export const MenuEntry = ({
  title,
  subtitle,
  isSelected,
  onClick,
  isSmallDevice,
}: IMenuEntryProps) => {
  const selectedBgColor = useColorModeValue('info.light', 'info.dark');
  const borderColor = useColorModeValue('textMuted.light', 'textMuted.dark');
  const textColor = useColorModeValue('text.light', 'text.dark');
  const selectedTextColor = 'white';

  return (
    <Square
      onClick={onClick}
      cursor={isSelected ? 'auto' : 'pointer'}
      size={isSmallDevice ? '100%' : '50%'}
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

        {subtitle && (
          <Text
            color={isSelected ? selectedTextColor : textColor}
            textAlign={'center'}>
            {subtitle}
          </Text>
        )}
      </VStack>
    </Square>
  );
};
