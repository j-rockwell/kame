import {useCallback} from "react";
import {useReservationContext} from "@/context/ReservationContext";
import {IScalable} from "@/hooks/Dimensions";
import {TableMenu} from "@/models/Table";
import {Box, Stack, useColorModeValue} from "@chakra-ui/react";
import {MenuEntry} from "@/components/menu-picker/MenuPickerEntry";

interface IMenuPickerProps extends IScalable {
  menu?: TableMenu;
  setMenu: (m: TableMenu) => void;
}

export const MenuPicker = ({menu, setMenu, isSmallDevice}: IMenuPickerProps) => {
  const {isLoadingReservations, loadingReservationError} = useReservationContext();

  const errorTextColor = useColorModeValue('danger.light', 'danger.dark');

  const isMenuSelected = useCallback((m: TableMenu) => {
    return menu === m;
  }, []);

  const handleMenuChange = useCallback((m: TableMenu) => {
    if (menu === m) {
      return;
    }

    setMenu(m);
  }, [menu, setMenu]);

  if (loadingReservationError) {
    return (
      <Box w={'100%'} />
    );
  }

  if (isLoadingReservations) {
    return (
      <Box w={'100%'} />
    );
  }

  return (
    <Stack w={'100%'} direction={isSmallDevice ? 'column' : 'row'}>
      <MenuEntry
        title={'Signature'}
        isSelected={isMenuSelected('SIGNATURE')}
        onClick={() => handleMenuChange('SIGNATURE')}
        isSmallDevice={isSmallDevice}
      />

      <MenuEntry
        title={'Premium'}
        isSelected={isMenuSelected('PREMIUM')}
        onClick={() => handleMenuChange('PREMIUM')}
        isSmallDevice={isSmallDevice}
      />
    </Stack>
  )
}