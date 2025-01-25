import { WithChildren } from "@/ui/props";
import { Auth0Provider } from "@auth0/auth0-react";

type AuthProviderProps = WithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <Auth0Provider
      domain={`${import.meta.env.VITE_AUTH0_DOMAIN}`}
      clientId={`${import.meta.env.VITE_AUTH0_CLIENT_ID}`}
      authorizationParams={{
        redirect_uri: `${import.meta.env.VITE_AUTH0_REDIRECT_URI}`,
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
