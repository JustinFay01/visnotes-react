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
        scope: `${import.meta.env.VITE_OCR_API_SCOPE} ${
          import.meta.env.VITE_AUTH0_SCOPE
        }`,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
