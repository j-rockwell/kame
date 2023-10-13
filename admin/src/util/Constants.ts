import * as process from 'process';

const __DEV__ = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

export const API_URL = __DEV__
  ? process.env.NEXT_PUBLIC_DEV_API_ENDPOINT
  : process.env.NEXT_PUBLIC_PROD_API_ENDPOINT;