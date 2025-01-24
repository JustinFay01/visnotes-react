import { WithChildren } from "@/ui/props";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect } from "react";
import { addAuthToken } from "../axios";
import { useAuth } from "./use-auth";

type AuthenticatedProps = WithChildren;

export const Authenticated = ({ children }: AuthenticatedProps) => {
  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    getAccessTokenSilently().then(addAuthToken);
  }, [getAccessTokenSilently]);

  const Component = withAuthenticationRequired(() => <>{children}</>);
  return <Component />;
};
