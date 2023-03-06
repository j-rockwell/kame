import axios from "axios";
import {API_URL} from "@/util/Constants";
import {
  AuthSuccessResponse,
  AuthTokenSuccessResponse,
  AuthWithStandardCredentialsRequest,
  AuthWithTokenRequest
} from "@/requests/types/Auth";

/**
 * Performs a request and attempts to authenticate with
 * provided credentials.
 *
 * If successful a json-web-token will be stored in the
 * browsers credentials
 *
 * see: withCredentials flag for more info
 * @param {AuthWithStandardCredentialsRequest} req Request params
 */
export async function attemptLoginWithCredentials(
  req: AuthWithStandardCredentialsRequest
): Promise<AuthSuccessResponse> {
  return new Promise<AuthSuccessResponse>(async (resolve, reject) => {
    try {
      const res = await axios.post<AuthSuccessResponse>(
        `${API_URL}/auth/`,
        {...req},
        {withCredentials: true}
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

/**
 * Performs a request and attempts to authenticate using an exisitng json-web-token
 *
 * If successful a sanitized account response will be returned
 *
 * @param {AuthWithTokenRequest} req Request params
 */
export async function attemptLoginWithToken(req: AuthWithTokenRequest): Promise<AuthTokenSuccessResponse> {
  return new Promise<AuthTokenSuccessResponse>(async (resolve, reject) => {
    try {
      const res = await axios.get<AuthTokenSuccessResponse>(`${API_URL}/auth/token`, {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      });

      if (!res || res.data) {
        return reject(new Error('query response empty'));
      }

      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}

export async function attemptRefreshToken() {

}

export async function attemptInvalidateToken() {

}