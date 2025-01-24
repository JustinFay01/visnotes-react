import { useAuth0 } from "@auth0/auth0-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (token: string) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: "" }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useAuth = () => {
  const {
    getAccessTokenSilently: getToken,
    logout: auth0logout,
    ...auth0
  } = useAuth0();
  const { accessToken, setAccessToken, clearAccessToken } = useAuthStore();

  const logout = () => {
    clearAccessToken();
    auth0logout();
  };

  const getAccessTokenSilently = async (): Promise<string> => {
    if (accessToken) {
      console.log("Using cached token");
      return accessToken;
    }
    console.log("Fetching new token");
    const token = await getToken();
    setAccessToken(token);
    return token;
  };

  return {
    ...auth0,
    getAccessTokenSilently,
    logout,
  };
};
