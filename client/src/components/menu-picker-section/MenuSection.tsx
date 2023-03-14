import {IScalable} from "@/hooks/Dimensions";
import {MenuSanitized} from "@/models/Menu";
import {MenuPicker} from "@/components/menu-picker/MenuPicker";
import {motion} from "framer-motion";
import {Heading} from "@chakra-ui/react";

interface IMenuSectionProps extends IScalable {
  active: boolean;
  availability?: MenuSanitized[];
  menu?: MenuSanitized;
  setMenu: (m: MenuSanitized) => void;
}

export const MenuSection = ({
  active,
  availability,
  menu,
  setMenu,
  isSmallDevice
}: IMenuSectionProps) => {
  return (
    <motion.div
      animate={{opacity: active ? 1 : 0.25}}
      style={{
        width: '100%',
      }}
    >
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
    </motion.div>
  )
}