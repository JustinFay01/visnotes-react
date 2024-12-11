import { DashboardView } from "@/features/dashboard/dashboard-view";
import { RouteBase } from "@/ui/layout/route-base";

export const DashboardRoute = () => {
  return (
    <RouteBase>
      <DashboardView />
    </RouteBase>
  );
};
