/**
 * Accepts an array of single item records and generates a query string
 * @param values Array of Record<string,string>
 */
export function createQueryParams(values: Map<string, string>): string {
  let result = '?';
  values.forEach((v, k) => result = result + `${k}=${v}&`);
  return result.substring(0, result.length - 1); // remove trailing '&'
}