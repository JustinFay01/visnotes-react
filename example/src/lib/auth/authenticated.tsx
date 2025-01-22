import { WithChildren } from "@/ui/props";
import { withAuthenticationRequired } from "@auth0/auth0-react";

type AuthenticatedProps = WithChildren;

export const Authenticated = ({ children }: AuthenticatedProps) => {
  const Component = withAuthenticationRequired(() => <>{children}</>);
  return <Component />;
};
