import { WithChildren } from "../props";
import { BaseLayout, HeaderLayout } from "./blocks";
import { ErrorBase } from "../components/errors/error-base";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Suspense } from "react";

export type RouteBaseProps = WithChildren & {
  errorFallback?: (props: FallbackProps) => React.ReactNode;
  suspenseFallback?: React.ReactNode;
};

export const RouteBase = ({
  children,
  errorFallback,
  suspenseFallback,
}: RouteBaseProps) => {
  return (
    <ErrorBoundary FallbackComponent={errorFallback ?? ErrorBase}>
      <HeaderLayout>
        <Suspense fallback={suspenseFallback ?? <div>Loading...</div>} />
        {children}
      </HeaderLayout>
    </ErrorBoundary>
  );
};

export type ErrorRouteBaseProps = RouteBaseProps;

export const ErrorRouteBase = ({
  children,
  errorFallback,
  suspenseFallback,
}: ErrorRouteBaseProps) => {
  return (
    <ErrorBoundary FallbackComponent={errorFallback ?? ErrorBase}>
      <BaseLayout>
        <Suspense fallback={suspenseFallback ?? <div>Loading...</div>} />
        {children}
      </BaseLayout>
    </ErrorBoundary>
  );
};
