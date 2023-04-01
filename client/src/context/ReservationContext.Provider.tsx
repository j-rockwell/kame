import {useCallback, useEffect, useState} from "react";
import {getTableTimeAvailability} from "@/requests/Table";
import {getMenuAvailability} from "@/requests/Menu";
import {ReservationContext} from "@/context/ReservationContext";
import {MenuSanitized} from "@/models/Menu";
import {TableGroup, TableTime} from "@/models/Table";

interface IReservationContextProviderProps {
  children: any;
}

export function ReservationContextProvider({children}: IReservationContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [groupSize, setGroupSize] = useState<number | undefined>(undefined);
  const [groupTime, setGroupTime] = useState<TableGroup | undefined>(undefined);
  const [groupMenu, setGroupMenu] = useState<MenuSanitized | undefined>(undefined);
  const [timeAvailability, setTimeAvailability] = useState<TableGroup[]>([]);
  const [menuAvailability, setMenuAvailability] = useState<MenuSanitized[]>([]);
  const [groupDate, setGroupDate] = useState<TableTime | undefined>(undefined);

  /**
   * Write the current state to session storage
   */
  const writeToStorage = useCallback(() => {
    const storage = window.sessionStorage;
    const toJson = {
      "group_size": groupSize,
      "group_time": groupTime,
      "group_menu": groupMenu,
      "group_date": groupDate,
    }

    storage.setItem("reservation_data", JSON.stringify(toJson));
  }, [groupDate, groupMenu, groupSize, groupTime]);

  /**
   * Read session storage in to state
   */
  const getFromStorage = useCallback(() => {
    const storage = window.sessionStorage;
    const data = storage.getItem("reservation_data");

    if (!data) {
      return;
    }

    const fromJson = JSON.parse(data);
    setGroupSize(fromJson["group_size"]);
    setGroupTime(fromJson["group_time"]);
    setGroupMenu(fromJson["group_menu"]);
    setGroupDate(fromJson["group_date"]);
  }, []);

  useEffect(() => {
    getFromStorage();
    console.debug('fromStorage()');
  }, [getFromStorage]);

  useEffect(() => {
    // prevents overwriting on initial load
    if (!groupSize && !groupTime && !groupMenu && !groupDate) {
      return;
    }

    writeToStorage();
    console.debug('toStorage()');
  }, [groupSize, groupTime, groupMenu, groupDate, writeToStorage, loading]);

  /**
   * Handles group time query when this field is updated
   */
  useEffect(() => {
    setLoading(true);
    setError(undefined);

    // skip if date is empty
    if (!groupDate) {
      return;
    }

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