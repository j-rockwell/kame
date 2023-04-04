import {AccountPreferences} from '@/models/Account';

export type CreateAccountRequest = {
  first_name: string;
  last_name: string;
  email_address: string;
  phone: string;
  password: string;
  preferences?: AccountPreferences;
};

export type CreateAccountResponse = {
  id: string;
  access_token: string;
  refresh_token: string;
};
