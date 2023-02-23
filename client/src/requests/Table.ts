import axios from "axios";
import {API_URL} from "@/util/Constants";
import {createQueryParams} from "@/util/Query";

import {
  GetTableMenuAvailabilityRequest, GetTableMenuAvailabilityResponse,
  GetTableTimeAvailabilityRequest,
  GetTableTimeAvailabilityResponse
} from "@/requests/types/Table";

/**
 * Returns table time availability on a given date
 * @param {GetTableTimeAvailabilityRequest} req Request params
 */
export async function getTableTimeAvailability(
  req: GetTableTimeAvailabilityRequest
): Promise<GetTableTimeAvailabilityResponse> {
  const params = createQueryParams(
    new Map([
      ['day', req.day.toString()],
      ['month', req.month.toString()],
      ['year', req.year.toString()],
    ])
  );

  return new Promise<GetTableTimeAvailabilityResponse>(async (resolve, reject) => {
    try {
      const res = await axios.get<GetTableTimeAvailabilityResponse>(`${API_URL}/table/availability/time${params}`);

      if (!res || !res.data) {
        return reject(new Error('query response empty'));
      }

      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}

/**
 * Returns table/menu availability on a given date/group time
 * @param {GetTableMenuAvailabilityRequest} req Request params
 */
export async function getTableMenuAvailability(
  req: GetTableMenuAvailabilityRequest
): Promise<GetTableMenuAvailabilityResponse> {
  const params = createQueryParams(
    new Map([
      ['day', req.day.toString()],
      ['month', req.month.toString()],
      ['year', req.year.toString()],
      ['group', req.group.toString()]
    ])
  );

  return new Promise<GetTableMenuAvailabilityResponse>(async (resolve, reject) => {
    try {
      const res = await axios.get<GetTableMenuAvailabilityResponse>(`${API_URL}/table/availability/menu${params}`);

      if (!res || !res.data) {
        return reject(new Error('query response empty'));
      }

      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  })
}