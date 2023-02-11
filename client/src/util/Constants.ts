import * as process from "process";

const __DEV__ = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

export const PHONE_NUMBER = "(702) 771-0122";
export const PHONE_NUMBER_RAW = "7027710122";

export const MOBILE_WIDTH_BREAKPOINT = 864;
export const DESKTOP_WIDTH_BREAKPOINT = 1024;

// TODO: update prod api url
export const API_URL = __DEV__
  ? `http://localhost:8080`
  : `http://localhost:8080`;