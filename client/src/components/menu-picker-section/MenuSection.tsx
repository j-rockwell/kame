import {IScalable} from "@/hooks/Dimensions";
import {TableMenu} from "@/models/Table";
import {Box, Heading} from "@chakra-ui/react";
import {MenuPicker} from "@/components/menu-picker/MenuPicker";

interface IMenuSectionProps extends IScalable {
  menu?: TableMenu;
  setMenu: (m: TableMenu) => void;
}

export const MenuSection = ({menu, setMenu, isSmallDevice}: IMenuSectionProps) => {
  return (
    <Box w={'100%'}>
      <Heading
        size={'lg'}
        mb={8}
        textAlign={isSmallDevice ? 'center' : 'left'}>
        Which menu would you like to have prepared?
      </Heading>

      <MenuPicker menu={menu} setMenu={setMenu} isSmallDevice={isSmallDevice} />
    </Box>
  )
}