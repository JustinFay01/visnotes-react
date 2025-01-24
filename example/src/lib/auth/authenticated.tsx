import { WithChildren } from "@/ui/props";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect } from "react";
import { addAuthToken } from "../axios";

type AuthenticatedProps = WithChildren;

export const Authenticated = ({ children }: AuthenticatedProps) => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then(addAuthToken);
  }, [getAccessTokenSilently]);

  const Component = withAuthenticationRequired(() => <>{children}</>);
  return <Component />;
};
