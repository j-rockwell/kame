import {useCallback} from 'react';
import {useReservationContext} from '@/context/ReservationContext';
import {MenuEntry} from '@/components/menu-picker/MenuPickerEntry';
import {IScalable} from '@/hooks/Dimensions';
import {MenuSanitized} from '@/models/Menu';
import {Box, Skeleton, Stack, Text, useColorModeValue} from '@chakra-ui/react';

interface IMenuPickerProps extends IScalable {
  availability?: MenuSanitized[];
  menu?: MenuSanitized;
  setMenu: (m: MenuSanitized) => void;
}

export const MenuPicker = ({
  availability,
  menu,
  setMenu,
  isSmallDevice,
}: IMenuPickerProps) => {
  const {isLoadingReservations, loadingReservationError} =
    useReservationContext();
  const errorTextColor = useColorModeValue('danger.light', 'danger.dark');
  const skeletonStyling = {
    w: '100%',
    h: '10rem',
    borderRadius: 12,
  };

  /**
   * Returns true if the provided menu is selected
   */
  const isMenuSelected = useCallback(
    (m: MenuSanitized) => {
      if (!menu) {
        return false;
      }

      return menu.id === m.id;
    },
    [menu],
  );

  /**
   * Handles menu selection change
   */
  const handleMenuChange = useCallback(
    (m: MenuSanitized) => {
      if (menu && menu.id === m.id) {
        return;
      }

      setMenu(m);
    },
    [menu, setMenu],
  );

  if (
    !availability ||
    availability.length <= 0 ||
    isLoadingReservations ||
    loadingReservationError
  ) {
    return (
      <Box w={'100%'}>
        <Stack w={'100%'} direction={isSmallDevice ? 'column' : 'row'}>
          <Skeleton {...skeletonStyling} />
          <Skeleton {...skeletonStyling} />
        </Stack>

        {loadingReservationError && (
          <Text color={errorTextColor} mt={2}>
            {loadingReservationError}
          </Text>
        )}
      </Box>
    );
  }

  return (
    <Stack w={'100%'} direction={isSmallDevice ? 'column' : 'row'}>
      {availability &&
        availability.map(menu => (
          <MenuEntry
            key={menu.id}
            title={menu.name}
            subtitle={`$${menu.price}`}
            isSelected={isMenuSelected(menu)}
            onClick={() => handleMenuChange(menu)}
            isSmallDevice={isSmallDevice}
          />
        ))}
    </Stack>
  );
};
