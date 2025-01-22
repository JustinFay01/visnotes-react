import { WithChildren } from "@/ui/props";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = WithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState?: AppState) => {
    console.log("onRedirectCallback", appState);
    console.log("window.location.pathname", window.location.pathname);
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  useEffect(() => {
    console.log("window.location.pathname", window.location.pathname);
  }, []);

  return (
    <Auth0Provider
      domain="dev-ng5tluk5g60gk26h.us.auth0.com"
      clientId="MYghop0VEcKYxHzFKb5jHC2i75lnW4Ht"
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
