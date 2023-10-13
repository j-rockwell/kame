import {GetTableResponse} from "@/request/response/Table";
import {API_URL} from "@/util/Constants";
import axios from "axios";

export async function getTables(page: number): Promise<GetTableResponse> {
  return new Promise<GetTableResponse>(async (resolve, reject) => {
    try {
      const res = await axios.get<GetTableResponse>(`${API_URL}/table/?page=${page}`);

      if (!res || !res.data) {
        reject(new Error("query returned empty data"));
        return;
      }

      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}