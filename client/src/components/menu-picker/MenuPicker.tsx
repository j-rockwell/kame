import {useCallback} from "react";
import {useReservationContext} from "@/context/ReservationContext";
import {MenuEntry} from "@/components/menu-picker/MenuPickerEntry";
import {IScalable} from "@/hooks/Dimensions";
import {MenuSanitized} from "@/models/Menu";
import {Stack, useColorModeValue} from "@chakra-ui/react";

interface IMenuPickerProps extends IScalable {
  availability?: MenuSanitized[];
  menu?: MenuSanitized;
  setMenu: (m: MenuSanitized) => void;
}

export const MenuPicker = ({availability, menu, setMenu, isSmallDevice}: IMenuPickerProps) => {
  const {isLoadingReservations, loadingReservationError} = useReservationContext();

  const errorTextColor = useColorModeValue('danger.light', 'danger.dark');

  const isMenuSelected = useCallback((m: MenuSanitized) => {
    if (!menu) {
      return false;
    }

    return menu.id === m.id;
  }, [menu]);

  const handleMenuChange = useCallback((m: MenuSanitized) => {
    if (menu && menu.id === m.id) {
      return;
    }

    setMenu(m);
  }, [menu, setMenu]);

  // TODO: Remove when shifting over to using state
  /* if (loadingReservationError) {
    return (
      <Box w={'100%'} />
    );
  }

  if (isLoadingReservations) {
    return (
      <Box w={'100%'} />
    );
  } */

  return (
    <Stack w={'100%'} direction={isSmallDevice ? 'column' : 'row'}>
      {availability && availability.map(menu => (
        <MenuEntry
          key={menu.id}
          title={menu.name}
          subtitle={`$${menu.price}`}
          isSelected={isMenuSelected(menu)}
          onClick={() => handleMenuChange(menu)}
          isSmallDevice={isSmallDevice} />
      ))}
    </Stack>
  )
}