import {MenuSanitized} from "@/models/Menu";
import {TableGroup} from "@/models/Table";

export type GetAvailableMenusRequest = {
  day: number;
  month: number;
  year: number;
  group: TableGroup;
}

export type GetAvailableMenusResponse = MenuSanitized[];