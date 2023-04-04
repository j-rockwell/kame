import {getCarrier} from '../models/Card';

describe('Carrier ->', () => {
  // test card numbers:
  // https://stripe.com/docs/testing#cards
  it('getCarrier ->', () => {
    const amex = getCarrier('371449635398431');
    const amex2 = getCarrier('341');
    const visa = getCarrier('4242424242424242');
    const mastercard = getCarrier('5555555555554444');
    const disc = getCarrier('6011111111111117');
    const invalid = getCarrier('892934902');

    expect(amex).toEqual('American Express');
    expect(amex2).toEqual('American Express');
    expect(visa).toEqual('Visa');
    expect(mastercard).toEqual('Mastercard');
    expect(disc).toEqual('Discover');
    expect(invalid).toBeUndefined();
  });
});
