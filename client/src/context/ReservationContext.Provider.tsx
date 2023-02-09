import {useEffect, useState} from "react";
import {ReservationContext} from "@/context/ReservationContext";
import {TableGroup, TableTime} from "@/models/Table";

interface IReservationContextProviderProps {
  children: any;
}

export function ReservationContextProvider({children}: IReservationContextProviderProps) {
  const DATE = new Date();
  const [groupSize, setGroupSize] = useState(1);
  const [groupTime, setGroupTime] = useState<TableGroup | undefined>(undefined);
  const [groupDate, setGroupDate] = useState<TableTime>({
    month: DATE.getMonth(),
    day: DATE.getDate(),
    year: DATE.getFullYear()
  });

  /**
   * Handles group time query when this field is updated
   */
  useEffect(() => {
    console.debug('TODO: handle table time update')
  }, [groupDate]);

  return (
    <ReservationContext.Provider value={{
      groupSize: groupSize,
      groupTime: groupTime,
      groupDate: groupDate,
      setGroupSize: setGroupSize,
      setGroupTime: setGroupTime,
      setGroupDate: setGroupDate,
    }}>
      {children}
    </ReservationContext.Provider>
  )
}