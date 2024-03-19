import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

interface AuthProps {
  authState?: AuthState;
  signIn?: (email: string, password: string) => Promise<any>;
  signOut?: () => Promise<any>;
}

interface AuthState {
  token: string | null;
  authenticated: boolean | null;
  loading: boolean;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
    loading: true,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(
        process.env.EXPO_PUBLIC_TOKENSTORE_KEY
      );

      if (token) {
        console.log(
          "𝐚𝐢𝐤𝐢𝐧𝐬 ~ file: auth-context.tsx:37 ~ loadToken ~ token:",
          token
        );
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token,
          authenticated: true,
          loading: false,
        });
      } else {
        setAuthState({
          token: null,
          authenticated: false,
          loading: false,
        });
      }
    };

    loadToken();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_API_BASEURL}/login`,
        { email, password }
      );

      console.log(
        "𝐚𝐢𝐤𝐢𝐧𝐬 ~ file: auth-context.tsx:30 ~ signin ~ result:",
        result
      );

      setAuthState({
        token: result.data.accessToken,
        authenticated: true,
        loading: false,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.accessToken}`;

      await SecureStore.setItemAsync(
        process.env.EXPO_PUBLIC_TOKENSTORE_KEY,
        result.data.accessToken
      );
    } catch (error) {
      return { error: true, message: error.response.data.error };
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_TOKENSTORE_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
      loading: false,
    });
  };

  const value = {
    authState,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
