import { WithChildren } from "@/ui/props";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = WithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={`${import.meta.env.VITE_AUTH0_DOMAIN}`}
      clientId={`${import.meta.env.VITE_AUTH0_CLIENT_ID}`}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
        scope:
          "read:current_user update:current_user_metadata read:notes create:notes",
      }}
    >
      {children}
    </Auth0Provider>
  );
};
