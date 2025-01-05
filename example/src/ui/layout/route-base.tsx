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
    <HeaderLayout>
      <ErrorBoundary FallbackComponent={errorFallback ?? ErrorBase}>
        <Suspense fallback={suspenseFallback ?? <div>Loading...</div>} />
        {children}
      </ErrorBoundary>
    </HeaderLayout>
  );
};

export type ErrorRouteBaseProps = RouteBaseProps;

export const ErrorRouteBase = ({
  children,
  errorFallback,
  suspenseFallback,
}: ErrorRouteBaseProps) => {
  return (
    <BaseLayout>
      <ErrorBoundary FallbackComponent={errorFallback ?? ErrorBase}>
        <Suspense fallback={suspenseFallback ?? <div>Loading...</div>} />
        {children}
      </ErrorBoundary>
    </BaseLayout>
  );
};
