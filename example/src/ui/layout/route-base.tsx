import { WithChildren } from "../props";
import { BasicLayout } from "./blocks";
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
    <BasicLayout>
      <ErrorBoundary FallbackComponent={errorFallback ?? ErrorBase}>
        <Suspense fallback={suspenseFallback ?? <div>Loading...</div>} />
        {children}
      </ErrorBoundary>
    </BasicLayout>
  );
};
