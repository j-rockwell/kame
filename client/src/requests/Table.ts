import axios, {AxiosError} from "axios";
import {API_URL} from "@/util/Constants";
import {GetTableAvailabilityRequest, GetTableAvailabilityResponse} from "@/requests/types/Table";
import {createQueryParams} from "@/util/Query";

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
      const result = await axios.get<GetTableAvailabilityResponse>(`${API_URL}/table/availability${params}`);
      return resolve(result.data);
    } catch (e) {
      return reject(e as AxiosError);
    }
  });
}