import {Account} from "@/models/Account";
import {createContext, useContext} from "react";

interface IAuthContext {
  account?: Account;
  accessToken?: string;
  isAccountLoading: boolean;
  loadingAccountError?: string;
  setAccount: (acc: Account) => void;
  setAccessToken: (t: string) => void;
  setAccountLoading: (b: boolean) => void;
  setLoadingAccountError: (s?: string) => void;
}

/**
 * Creates a new React context and initializes default values
 */
export const AuthContext = createContext<IAuthContext>({
  account: undefined,
  accessToken: undefined,
  isAccountLoading: false,
  loadingAccountError: undefined,
  setAccount: () => {},
  setAccessToken: () => {},
  setAccountLoading: () => {},
  setLoadingAccountError: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
