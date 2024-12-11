import { ErrorExample } from "@/features/landing/components/error-example";
import { RouteBase } from "@/ui/layout/route-base";

export const DashboardRoute = () => {
  return (
    <RouteBase>
      <ErrorExample />
      <h1>Dashboard</h1>
    </RouteBase>
  );
};
