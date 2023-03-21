import {useEffect, useState} from "react";
import {attemptLoginWithToken, attemptRefreshToken} from "@/requests/Auth";
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

  /**
   * Requests a new access token on each initial load
   */
  useEffect(() => {
    setLoading(true);

    attemptRefreshToken().then(data => {
      setAccessToken(data.access_token);
    }).catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  /**
   * Attempts to authenticate with a stored token whenever the accessToken field is updated
   */
  useEffect(() => {
    if (!accessToken) {
      setAccount(undefined);
      return;
    }

    setLoading(true);

    attemptLoginWithToken({token: accessToken}).then(data => {
      setAccount({
        id: data.id,
        email_address: data.email_address,
        first_name: data.first_name,
        last_name: data.last_name,
      });
    }).catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{
      account: account,
      accessToken: accessToken,
      isAuthenticated: (account !== undefined),
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
