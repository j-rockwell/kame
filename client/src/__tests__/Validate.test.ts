import {isEmailRegexp} from "../util/Validate";

describe('Validate ->', () => {
  it('isEmailRegexp (valid) ->', () => {
    const a = 'john@test.com';
    const b = 'admin@sushikame.com';
    const c = 'brit@hotmail.co.uk';

    const resA = isEmailRegexp(a);
    const resB = isEmailRegexp(b);
    const resC = isEmailRegexp(c);

    expect(resA).toEqual(true);
    expect(resB).toEqual(true);
    expect(resC).toEqual(true);
  });

  it('isEmailRegexp (invalid) ->', () => {
    const a = '10230@';
    const b = '@test.com';
    const c = '203040403040@4040340430404.9';

    const resA = isEmailRegexp(a);
    const resB = isEmailRegexp(b);
    const resC = isEmailRegexp(c);

    expect(resA).toEqual(false);
    expect(resB).toEqual(false);
    expect(resC).toEqual(false);
  });
});