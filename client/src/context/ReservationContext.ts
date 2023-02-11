import {createContext, useContext} from "react";
import {TableGroup, TableTime} from "@/models/Table";

const DATE = new Date();

interface IReservationContext {
  loading: boolean;
  groupSize: number;
  groupDate: TableTime;
  groupTime?: TableGroup;
  setLoading: (b: boolean) => void;         // loading state bool
  setGroupSize: (n: number) => void;        // int
  setGroupDate: (tt: TableTime) => void;    // Calendar date (month,day,year)
  setGroupTime: (tg?: TableGroup) => void;  // A or B
}

/**
 * Creates a new React context and initializes default values
 */
export const ReservationContext = createContext<IReservationContext>({
  loading: false,
  groupSize: 1,
  groupTime: undefined,
  groupDate: {
    month: DATE.getMonth(),
    day: DATE.getDate(),
    year: DATE.getFullYear()
  },
  setLoading: () => {},
  setGroupSize: () => {},
  setGroupDate: () => {},
  setGroupTime: () => {},
});

export const useReservationContext = () => useContext(ReservationContext);
