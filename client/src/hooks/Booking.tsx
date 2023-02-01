import {useState} from "react";
import {TableGroup, TableTime} from "@/models/Table";

/**
 * useBooking is a custom hook which initializes all
 * booking-releated state values
 */
export function useBooking() {
  const DATE = new Date();
  const [groupSize, setGroupSize] = useState(1);
  const [group, setGroup] = useState<TableGroup | undefined>(undefined);
  const [tableTime, setTableTime] = useState<TableTime>({
    month: DATE.getMonth(),
    day: DATE.getDate(),
    year: DATE.getFullYear()
  });

  return {
    groupSize,
    tableTime,
    group,
    setGroupSize,
    setTableTime,
    setGroup,
  };
}
