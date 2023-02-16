export type AccountPreferences = {
  email_opt_in: boolean;
  text_opt_in: boolean;
}

export type NewAccountData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phone: string;
  password: string;
}

export type LoginAccountData = {
  emailAddress: string;
  password: string;
}