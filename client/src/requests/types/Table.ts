import {TableGroup} from '@/models/Table';

export type GetTableTimeAvailabilityRequest = {
  day: number;
  month: number;
  year: number;
};

export type GetTableTimeAvailabilityResponse = {
  availability: TableGroup[];
};
