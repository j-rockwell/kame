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
  const [error, setError] = useState<string | undefined>(undefined);
  const [groupSize, setGroupSize] = useState(1);
  const [groupTime, setGroupTime] = useState<TableGroup | undefined>(undefined);
  const [availability, setAvailability] = useState<TableGroup[]>([]);

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
    setError(undefined);

    getTableAvailability({...groupDate}).then(data => {
      setAvailability(data.availability);
    }).catch(err => {
      setAvailability([]);
      setError(err.toString());
    }).finally(() => {
      setLoading(false);
    })
  }, [groupDate]);

  return (
    <ReservationContext.Provider value={{
      isLoadingReservations: loading,
      loadingReservationError: error,
      groupSize: groupSize,
      groupTime: groupTime,
      groupDate: groupDate,
      availability: availability,
      setLoadingReservations: setLoading,
      setLoadingReservationError: setError,
      setGroupSize: setGroupSize,
      setGroupTime: setGroupTime,
      setGroupDate: setGroupDate,
      setAvailability: setAvailability,
    }}>
      {children}
    </ReservationContext.Provider>
  )
}