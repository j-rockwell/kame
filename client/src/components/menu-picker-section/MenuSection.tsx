import {IScalable} from "@/hooks/Dimensions";
import {MenuSanitized} from "@/models/Menu";
import {Box, Heading} from "@chakra-ui/react";
import {MenuPicker} from "@/components/menu-picker/MenuPicker";

interface IMenuSectionProps extends IScalable {
  availability?: MenuSanitized[];
  menu?: MenuSanitized;
  setMenu: (m: MenuSanitized) => void;
}

export const MenuSection = ({availability, menu, setMenu, isSmallDevice}: IMenuSectionProps) => {
  return (
    <Box w={'100%'}>
      <Heading
        size={'lg'}
        mb={8}
        textAlign={isSmallDevice ? 'center' : 'left'}>
        Which menu would you like to have prepared?
      </Heading>

      <MenuPicker
        availability={availability}
        menu={menu}
        setMenu={setMenu}
        isSmallDevice={isSmallDevice}
      />
    </Box>
  )
}