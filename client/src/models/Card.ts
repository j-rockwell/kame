export type CardCarrier =
  | 'American Express'
  | 'Discover'
  | 'Mastercard'
  | 'Visa';

/**
 * Accepts a string and returns a credit card carrier matching the
 * provided digits.
 *
 * For American Express at least two digits must be provided.
 *
 * @param {string} prefix Card number
 */
export function getCarrier(prefix: string): CardCarrier | undefined {
  if (prefix.length <= 0) {
    return undefined;
  }

  if (
    prefix.length >= 2 &&
    (prefix.substring(0, 2) === '34' || prefix.substring(0, 2) === '37')
  ) {
    return 'American Express';
  }

  if (prefix.charAt(0) === '4') {
    return 'Visa';
  }

  if (prefix.charAt(0) === '5') {
    return 'Mastercard';
  }

  if (prefix.charAt(0) === '6') {
    return 'Discover';
  }

  return undefined;
}
