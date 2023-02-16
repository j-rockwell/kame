import {CreateAccountRequest, CreateAccountResponse} from "@/requests/types/Account";
import axios from "axios";
import {API_URL} from "@/util/Constants";

/**
 * Attempts to create a new account and returns the new a
 * CreateAccountResponse object
 *
 * @param {CreateAccountRequest} req Request params
 */
export async function createAccount(
  req: CreateAccountRequest
): Promise<CreateAccountResponse> {
  return new Promise<CreateAccountResponse>(async (resolve, reject) => {
    try {
      const res = await axios.post<CreateAccountResponse>(`${API_URL}/account/`, {req});

      if (!res || !res.data) {
        return reject(new Error('query response empty'));
      }

      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}