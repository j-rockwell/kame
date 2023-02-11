import {useEffect, useState} from "react";
import {ReservationContext} from "@/context/ReservationContext";
import {TableGroup, TableTime} from "@/models/Table";
import {getTableAvailability} from "@/requests/Table";

interface IReservationContextProviderProps {
  children: any;
}

export function ReservationContextProvider({children}: IReservationContextProviderProps) {
  const DATE = new Date();
  DATE.setDate(DATE.getDate() + 1); // roll date over one day so same-day reservations cant be made

  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const result = getTableAvailability({...groupDate});
      console.debug(result);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }, [groupDate]);

  return (
    <ReservationContext.Provider value={{
      loading: loading,
      groupSize: groupSize,
      groupTime: groupTime,
      groupDate: groupDate,
      setLoading: setLoading,
      setGroupSize: setGroupSize,
      setGroupTime: setGroupTime,
      setGroupDate: setGroupDate,
    }}>
      {children}
    </ReservationContext.Provider>
  )
}