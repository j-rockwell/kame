import {createQueryParams} from "@/util/Query";
import axios from "axios";
import {API_URL} from "@/util/Constants";
import {GetAvailableMenusRequest, GetAvailableMenusResponse} from "@/requests/types/Menu";

/**
 * Returns menu availability on a given date/group time
 * @param {GetAvailableMenusRequest} req Request params
 */
export async function getMenuAvailability(
  req: GetAvailableMenusRequest
): Promise<GetAvailableMenusResponse> {
  const params = createQueryParams(
    new Map([
      ['day', req.day.toString()],
      ['month', req.month.toString()],
      ['year', req.year.toString()],
      ['group', req.group.toString()]
    ])
  );

  return new Promise<GetAvailableMenusResponse>(async (resolve, reject) => {
    try {
      const res = await axios.get<GetAvailableMenusResponse>(`${API_URL}/menu/availability${params}`);

      if (!res || !res.data) {
        return reject(new Error('query response empty'));
      }

      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  })
}