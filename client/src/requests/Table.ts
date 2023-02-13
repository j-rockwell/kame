import axios from "axios";
import {API_URL} from "@/util/Constants";
import {createQueryParams} from "@/util/Query";
import {GetTableAvailabilityRequest, GetTableAvailabilityResponse} from "@/requests/types/Table";

/**
 * Returns table availability on a given date
 * @param {GetTableAvailabilityRequest} req Request params
 */
export async function getTableAvailability(
  req: GetTableAvailabilityRequest
): Promise<GetTableAvailabilityResponse> {
  const params = createQueryParams(
    new Map([
      ['day', req.day.toString()],
      ['month', req.month.toString()],
      ['year', req.year.toString()],
    ])
  );

  return new Promise<GetTableAvailabilityResponse>(async (resolve, reject) => {
    try {
      const res = await axios.get<GetTableAvailabilityResponse>(`${API_URL}/table/availability${params}`);

      if (!res || !res.data) {
        return reject(new Error('query response empty'));
      }

      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}