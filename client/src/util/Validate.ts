/**
 * Returns true if the provided email address is a valid email format
 * @param {string} s String to test
 */
export function isEmailRegexp(s: string): boolean {
  const regexp = new RegExp(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`);
  return regexp.test(s);
}
