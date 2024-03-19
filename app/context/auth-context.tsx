import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onSignin?: (email: string, password: string) => Promise<any>;
  onSignout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean;
  }>({
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(process.env.TOKEN_STORE_KEY);
      console.log(
        "𝐚𝐢𝐤𝐢𝐧𝐬 ~ file: auth-context.tsx:29 ~ loadToken ~ token:",
        token
      );

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${process.env.API_BASEURL}/login`);

      console.log(
        "𝐚𝐢𝐤𝐢𝐧𝐬 ~ file: auth-context.tsx:30 ~ signin ~ result:",
        result
      );

      setAuthState({ token: result.data.accessToken, authenticated: true });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.accessToken}`;

      await SecureStore.setItemAsync(
        process.env.TOKEN_STORE_KEY,
        result.data.accessToken
      );
    } catch (error) {
      return { error: true, message: error.response.data.responseDesc };
    }
  };

  const signout = async () => {
    await SecureStore.deleteItemAsync(process.env.TOKEN_STORE_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onSignin: signin,
    onSignout: signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
