export type AuthWithStandardCredentialsRequest = {
  email_address: string;
  password: string;
}

export type AuthWithTokenRequest = {
  token: string;
}

export type AuthSuccessResponse = {
  access_token: string;
  refresh_token: string;
}

export type AuthTokenSuccessResponse = {
  id: string;
  email_address: string;
  first_name: string;
  last_name: string;
}