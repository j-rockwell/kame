import axios from "axios";
import {API_URL} from "@/util/Constants";
import {createQueryParams} from "@/util/Query";

import {
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
      const res = await axios.get<GetTableTimeAvailabilityResponse>(`${API_URL}/table/availability${params}`);

      if (!res || !res.data) {
        return reject(new Error('query response empty'));
      }

      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}

