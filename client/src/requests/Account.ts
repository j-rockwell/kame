import axios from 'axios';
import {API_URL} from '@/util/Constants';
import {
  CreateAccountRequest,
  CreateAccountResponse,
} from '@/requests/types/Account';

/**
 * Attempts to create a new account and returns the new a
 * CreateAccountResponse object
 *
 * @param {CreateAccountRequest} req Request params
 */
export async function createAccount(
  req: CreateAccountRequest,
): Promise<CreateAccountResponse> {
  return new Promise<CreateAccountResponse>(async (resolve, reject) => {
    try {
      const res = await axios.post<CreateAccountResponse>(
        `${API_URL}/account/`,
        {
          first_name: req.first_name,
          last_name: req.last_name,
          email_address: req.email_address,
          password: req.password,
          phone: req.phone,
          preferences: req.preferences,
        },
      );

      if (!res || !res.data) {
        return reject(new Error('query response empty'));
      }

      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}
