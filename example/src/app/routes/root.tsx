import { BasicLayout } from "@/ui/layout/blocks";
import { Outlet } from "react-router-dom";

export const AppRoot = () => {
  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  );
};
