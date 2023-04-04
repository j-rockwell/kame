import {useCallback} from 'react';
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs';
import {HStack, Icon, Switch, useColorMode} from '@chakra-ui/react';

export const ColorModeToggle = () => {
  const {colorMode, setColorMode} = useColorMode();

  /**
   * Toggles the color mode state
   */
  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]);

  return (
    <HStack>
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
  );
};
