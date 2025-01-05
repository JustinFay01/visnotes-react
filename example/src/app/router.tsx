import { paths } from "@/lib/path";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // need to install react-router-dom
import { AppRoot } from "./routes/root";

const createRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      element: <AppRoot />,
      children: [
        {
          path: paths.app.dashboard.path,
          lazy: async () => {
            const { DashboardRoute } = await import("./routes/dashboard-route");
            return { Component: DashboardRoute };
          },
        },
      ],
    },
    {
      path: paths.error.notFound.path,
      lazy: async () => {
        const { NotFoundRoute } = await import(
          "./routes/errors/not-found-route"
        );
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const router = createRouter();

  return <RouterProvider router={router} />;
};
