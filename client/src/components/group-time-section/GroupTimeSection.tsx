import {GroupTimePicker} from "@/components/group-time-picker/GroupTimePicker";
import {Box, Heading, useColorModeValue} from "@chakra-ui/react";
import {IScalable} from "@/hooks/Dimensions";
import {TableGroup} from "@/models/Table";

interface IGroupTimeSectionProps extends IScalable {
  group?: TableGroup;
  setGroup: (g: TableGroup) => void;
}

export const GroupTimeSection = ({group, setGroup, isSmallDevice}: IGroupTimeSectionProps) => {
  return (
    <Box w={'100%'}>
      <Heading
        textAlign={isSmallDevice ? 'center' : 'left'}
        size={'lg'}
        mb={8}>
        What time would you like to begin?
      </Heading>

      <GroupTimePicker group={group} setGroup={setGroup} center={isSmallDevice} />
    </Box>
  )
}