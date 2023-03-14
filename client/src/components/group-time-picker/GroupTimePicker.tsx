import {useCallback} from "react";
import {GroupTimeEntry} from "@/components/group-time-picker/GroupTimeEntry";
import {TableGroup} from "@/models/Table";
import {Spinner, Square, Stack, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {useReservationContext} from "@/context/ReservationContext";
import {IScalable} from "@/hooks/Dimensions";

interface IGroupTimePicker extends IScalable {
  group?: TableGroup;
  setGroup: (g: TableGroup) => void;
}

export const GroupTimePicker = ({group, setGroup, isSmallDevice}: IGroupTimePicker) => {
  const {isLoadingReservations, loadingReservationError} = useReservationContext();

  const errorTextColor = useColorModeValue('danger.light', 'danger.dark');

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

  if (loadingReservationError) {
    return (
      <VStack>
        <Text color={errorTextColor} textAlign={isSmallDevice ? 'center' : 'left'}>
          {loadingReservationError}
        </Text>

        <Text color={errorTextColor} textAlign={isSmallDevice ? 'center' : 'left'}>
          Please refresh the page or select a new date on the calendar to try again.
        </Text>
      </VStack>
    );
  }

  if (isLoadingReservations) {
    return (
      <Square size={'100%'} flexDir={'column'}>
        <Spinner />
        <Text mt={'1rem'}>Fetching available reservations...</Text>
      </Square>
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
  )
}