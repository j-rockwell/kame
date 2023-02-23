import {createContext, useContext} from "react";
import {TableGroup, TableMenu, TableTime} from "@/models/Table";

const DATE = new Date();

interface IReservationContext {
  isLoadingReservations: boolean;
  loadingReservationError?: string;
  groupSize: number;
  groupDate: TableTime;
  groupTime?: TableGroup;
  groupMenu?: TableMenu;
  timeAvailability: TableGroup[];
  menuAvailability: TableMenu[];
  setLoadingReservations: (b: boolean) => void;         // loading state bool
  setLoadingReservationError: (err?: string) => void;   // loading error message
  setGroupSize: (n: number) => void;                    // int
  setGroupDate: (tt: TableTime) => void;                // Calendar date (month,day,year)
  setGroupTime: (tg?: TableGroup) => void;              // A or B
  setGroupMenu: (tm?: TableMenu) => void;               // SIGNATURE or PREMIUM
  setTimeAvailability: (tga: TableGroup[]) => void;     // A or B
  setMenuAvailability: (tma: TableMenu[]) => void;      // SIGNATURE or PREMIUM
}

/**
 * Creates a new React context and initializes default values
 */
export const ReservationContext = createContext<IReservationContext>({
  isLoadingReservations: false,
  loadingReservationError: undefined,
  groupSize: 1,
  groupTime: undefined,
  groupMenu: undefined,
  groupDate: {
    month: DATE.getMonth(),
    day: DATE.getDate(),
    year: DATE.getFullYear()
  },
  timeAvailability: [],
  menuAvailability: [],
  setLoadingReservations: () => {},
  setLoadingReservationError: () => {},
  setGroupSize: () => {},
  setGroupDate: () => {},
  setGroupTime: () => {},
  setGroupMenu: () => {},
  setTimeAvailability: () => {},
  setMenuAvailability: () => {},
});

export const useReservationContext = () => useContext(ReservationContext);
