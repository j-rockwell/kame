import {useCallback} from 'react';
import {GroupTimeEntry} from '@/components/group-time-picker/GroupTimeEntry';
import {useReservationContext} from '@/context/ReservationContext';
import {TableGroup} from '@/models/Table';
import {IScalable} from '@/hooks/Dimensions';
import {
  Box,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

interface IGroupTimePicker extends IScalable {
  group?: TableGroup;
  setGroup: (g: TableGroup) => void;
}

export const GroupTimePicker = ({
  group,
  setGroup,
  isSmallDevice,
}: IGroupTimePicker) => {
  const {isLoadingReservations, loadingReservationError} =
    useReservationContext();
  const errorTextColor = useColorModeValue('danger.light', 'danger.dark');
  const skeletonStyling = {
    w: '100%',
    h: '10rem',
    borderRadius: 12,
  };

  /**
   * Returns true if the provided group is actively selected
   */
  const isGroupSelected = useCallback(
    (g: TableGroup) => {
      return group === g;
    },
    [group],
  );

  /**
   * Handles group change and state update
   */
  const handleGroupChange = useCallback(
    (g: TableGroup) => {
      if (group === g) {
        return;
      }

      setGroup(g);
    },
    [group, setGroup],
  );

  if (isLoadingReservations || loadingReservationError) {
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
      <GroupTimeEntry
        title={'Group A'}
        subtitle={'6:00pm - 8:00pm'}
        isSelected={isGroupSelected('A')}
        isMobile={isSmallDevice}
        onClick={() => handleGroupChange('A')}
      />

      <GroupTimeEntry
        title={'Group B'}
        subtitle={'8:30pm - 10:30pm'}
        isSelected={isGroupSelected('B')}
        isMobile={isSmallDevice}
        onClick={() => handleGroupChange('B')}
      />
    </Stack>
  );
};
