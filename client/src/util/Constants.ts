import * as process from 'process';

const __DEV__ = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

export const API_URL = __DEV__
  ? process.env.NEXT_PUBLIC_DEV_API_ENDPOINT
  : process.env.NEXT_PUBLIC_PROD_API_ENDPOINT;

export const PHONE_NUMBER = "(702) 771-0122";
export const PHONE_NUMBER_RAW = "7027710122";
export const ADDRESS = "3616 W Spring Mountain Rd Ste 103, Las Vegas, NV 89102";
export const ADDRESS_GOOGLE = "https://www.google.com/maps/place/Kame+Omakase/@36.1269493,-115.1883544,15z/data=!4m2!3m1!1s0x0:0xe452a450df34718c?sa=X&ved=2ahUKEwjkhPrJyaL9AhWnPEQIHYyNATEQ_BJ6BAh6EAg";

export const INSTAGRAM = "https://www.instagram.com/kameomakase_lv/";
export const FACEBOOK = "https://www.facebook.com/KameOmakase/";

export const MOBILE_WIDTH_BREAKPOINT = 864;
export const DESKTOP_WIDTH_BREAKPOINT = 1080;