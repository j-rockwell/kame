import {TableGroup} from "@/models/Table";

export type GetTableAvailabilityRequest = {
  day: number;
  month: number;
  year: number;
}

export type GetTableAvailabilityResponse = {
  availability: TableGroup[];
}