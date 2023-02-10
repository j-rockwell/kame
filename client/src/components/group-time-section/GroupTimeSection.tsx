import {GroupTimePicker} from "@/components/group-time-picker/GroupTimePicker";
import {Box, Heading, useColorModeValue} from "@chakra-ui/react";
import {IScalable} from "@/hooks/Dimensions";
import {TableGroup} from "@/models/Table";

interface IGroupTimeSectionProps extends IScalable {
  group?: TableGroup;
  setGroup: (g: TableGroup) => void;
}

export const GroupTimeSection = ({group, setGroup, isSmallDevice}: IGroupTimeSectionProps) => {
  const textColor = useColorModeValue('text.light', 'text.dark');

  return (
    <Box w={'100%'}>
      <Heading color={textColor} textAlign={isSmallDevice ? 'center' : 'left'} size={'md'} mb={8}>Time</Heading>
      <GroupTimePicker group={group} setGroup={setGroup} center={isSmallDevice} />
    </Box>
  )
}