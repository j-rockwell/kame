/**
 * Accepts a map of string k,v and builds a query string that can be read
 * by the backend to perform dynamic requests.
 *
 * @param values Map<string,string>
 */
export function createQueryParams(values: Map<string, string>): string {
  let result = '?';
  values.forEach((v, k) => result = result + `${k}=${v}&`);
  return result.substring(0, result.length - 1); // remove trailing '&'
}