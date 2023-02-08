import {useCallback} from "react";
import {GroupTimeEntry} from "@/components/group-time-picker/GroupTimeEntry";
import {TableGroup} from "@/models/Table";
import {Stack} from "@chakra-ui/react";

interface IGroupTimePicker {
  center: boolean;
  group?: TableGroup;
  setGroup: (g: TableGroup) => void;
}

export const GroupTimePicker = ({group, setGroup, center}: IGroupTimePicker) => {
  /**
   * Returns true if the provided group is actively selected
   */
  const isGroupSelected = useCallback((g: TableGroup) => {
    return group === g;
  }, [group]);

  /**
   * Handles group change and state update
   */
  const handleGroupChange = useCallback((g: TableGroup) => {
    if (group === g) {
      return;
    }

    setGroup(g);
  }, [group, setGroup]);

  return (
    <Stack
      w={'100%'}
      direction={center ? 'column' : 'row'}>
      <GroupTimeEntry
        title={'Group A'}
        subtitle={'6:30pm - 8:00pm'}
        isSelected={isGroupSelected('A')}
        isMobile={center}
        onClick={() => handleGroupChange('A')}
      />

      <GroupTimeEntry
        title={'Group B'}
        subtitle={'8:30pm - 10:00pm'}
        isSelected={isGroupSelected('B')}
        isMobile={center}
        onClick={() => handleGroupChange('B')}
      />
    </Stack>
  )
}