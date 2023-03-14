import {GroupTimePicker} from "@/components/group-time-picker/GroupTimePicker";
import {IScalable} from "@/hooks/Dimensions";
import {TableGroup} from "@/models/Table";
import {motion} from "framer-motion";
import {Heading} from "@chakra-ui/react";

interface IGroupTimeSectionProps extends IScalable {
  active: boolean;
  group?: TableGroup;
  setGroup: (g: TableGroup) => void;
}

export const GroupTimeSection = ({active, group, setGroup, isSmallDevice}: IGroupTimeSectionProps) => {
  return (
    <motion.div
      animate={{opacity: active ? 1 : 0.25}}
      style={{
        width: '100%',
      }}
    >
      <Heading
        textAlign={isSmallDevice ? 'center' : 'left'}
        size={'lg'}
        mb={8}>
        What time would you like to begin?
      </Heading>

      <GroupTimePicker isSmallDevice={isSmallDevice} group={group} setGroup={setGroup} />
    </motion.div>
  )
}