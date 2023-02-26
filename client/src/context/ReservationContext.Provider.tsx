import {useEffect, useState} from "react";
import {getTableTimeAvailability} from "@/requests/Table";
import {getMenuAvailability} from "@/requests/Menu";
import {ReservationContext} from "@/context/ReservationContext";
import {MenuSanitized} from "@/models/Menu";
import {TableGroup, TableTime} from "@/models/Table";

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
  const [groupMenu, setGroupMenu] = useState<MenuSanitized | undefined>(undefined);
  const [timeAvailability, setTimeAvailability] = useState<TableGroup[]>([]);
  const [menuAvailability, setMenuAvailability] = useState<MenuSanitized[]>([]);

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

    getTableTimeAvailability({...groupDate}).then(data => {
      setTimeAvailability(data.availability);
    }).catch(err => {
      setTimeAvailability([]);
      setError(err.toString());
    }).finally(() => {
      setLoading(false);
    })
  }, [groupDate]);

  /**
   * Handles menu query when table group field is updated
   */
  useEffect(() => {
    setError(undefined);
    if (!groupTime || !groupDate) {
      return;
    }

    setLoading(true);

    getMenuAvailability(({group: groupTime, ...groupDate})).then(data => {
      setMenuAvailability(data);
    }).catch(err => {
      setMenuAvailability([]);
      setError(err.toString());
    }).finally(() => {
      setLoading(false);
    });
  }, [groupDate, groupTime]);

  return (
    <ReservationContext.Provider value={{
      isLoadingReservations: loading,
      loadingReservationError: error,
      groupSize: groupSize,
      groupTime: groupTime,
      groupDate: groupDate,
      groupMenu: groupMenu,
      timeAvailability: timeAvailability,
      menuAvailability: menuAvailability,
      setLoadingReservations: setLoading,
      setLoadingReservationError: setError,
      setGroupSize: setGroupSize,
      setGroupTime: setGroupTime,
      setGroupDate: setGroupDate,
      setGroupMenu: setGroupMenu,
      setTimeAvailability: setTimeAvailability,
      setMenuAvailability: setMenuAvailability,
    }}>
      {children}
    </ReservationContext.Provider>
  )
}