import {createContext, useContext} from "react";
import {TableGroup, TableTime} from "@/models/Table";

const DATE = new Date();

interface IReservationContext {
  isLoadingReservations: boolean;
  loadingReservationError?: string;
  groupSize: number;
  groupDate: TableTime;
  groupTime?: TableGroup;
  availability: TableGroup[];
  setLoadingReservations: (b: boolean) => void; // loading state bool
  setLoadingReservationError: (err?: string) => void;      // loading error message
  setGroupSize: (n: number) => void;            // int
  setGroupDate: (tt: TableTime) => void;        // Calendar date (month,day,year)
  setGroupTime: (tg?: TableGroup) => void;      // A or B
  setAvailability: (tga: TableGroup[]) => void; // A or B
}

/**
 * Creates a new React context and initializes default values
 */
export const ReservationContext = createContext<IReservationContext>({
  isLoadingReservations: false,
  loadingReservationError: undefined,
  groupSize: 1,
  groupTime: undefined,
  groupDate: {
    month: DATE.getMonth(),
    day: DATE.getDate(),
    year: DATE.getFullYear()
  },
  availability: [],
  setLoadingReservations: () => {},
  setLoadingReservationError: () => {},
  setGroupSize: () => {},
  setGroupDate: () => {},
  setGroupTime: () => {},
  setAvailability: () => {},
});

export const useReservationContext = () => useContext(ReservationContext);
