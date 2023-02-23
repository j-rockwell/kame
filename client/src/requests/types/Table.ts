import {TableGroup, TableMenu} from "@/models/Table";

export type GetTableTimeAvailabilityRequest = {
  day: number;
  month: number;
  year: number;
}

export type GetTableTimeAvailabilityResponse = {
  availability: TableGroup[];
}

export type GetTableMenuAvailabilityRequest = {
  day: number;
  month: number;
  year: number;
  group: TableGroup;
}

export type GetTableMenuAvailabilityResponse = {
  availability: TableMenu[];
}