import {useState} from "react";
import {Account} from "@/models/Account";
import {AuthContext} from "@/context/AuthContext";

interface IAuthContextProviderProps {
  children: any;
}

export function AuthContextProvider({children}: IAuthContextProviderProps) {
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  /*
    TODO: Initial account auth queries here
   */

  return (
    <AuthContext.Provider value={{
      account: account,
      accessToken: accessToken,
      isAccountLoading: loading,
      loadingAccountError: error,
      setAccount: setAccount,
      setAccessToken: setAccessToken,
      setAccountLoading: setLoading,
      setLoadingAccountError: setError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
