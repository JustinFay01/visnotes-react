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
          element: <div>Dashboard</div>,
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const router = createRouter();

  return <RouterProvider router={router} />;
};
