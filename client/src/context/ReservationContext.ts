import {createContext, useContext} from 'react';
import {TableGroup, TableTime} from '@/models/Table';
import {MenuSanitized} from '@/models/Menu';

interface IReservationContext {
  isLoadingReservations: boolean;
  loadingReservationError?: string;
  groupSize?: number;
  groupDate?: TableTime;
  groupTime?: TableGroup;
  groupMenu?: MenuSanitized;
  timeAvailability: TableGroup[];
  menuAvailability: MenuSanitized[];
  setLoadingReservations: (b: boolean) => void; // loading state bool
  setLoadingReservationError: (err?: string) => void; // loading error message
  setGroupSize: (n: number) => void; // int
  setGroupDate: (tt: TableTime) => void; // Calendar date (month,day,year)
  setGroupTime: (tg?: TableGroup) => void; // A or B
  setGroupMenu: (m?: MenuSanitized) => void; // Menu Object
  setTimeAvailability: (tga: TableGroup[]) => void; // A or B
  setMenuAvailability: (ms: MenuSanitized[]) => void; // Menu Object
}

/**
 * Creates a new React context and initializes default values
 */
export const ReservationContext = createContext<IReservationContext>({
  isLoadingReservations: false,
  loadingReservationError: undefined,
  groupSize: undefined,
  groupTime: undefined,
  groupMenu: undefined,
  groupDate: undefined,
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
