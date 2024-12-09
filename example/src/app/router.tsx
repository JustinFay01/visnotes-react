import { paths } from "@/lib/path";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // need to install react-router-dom
import { LandingRoute } from "./routes/landing-route";

const createRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      element: <LandingRoute />,
    },
  ]);

export const AppRouter = () => {
  const router = createRouter();

  return <RouterProvider router={router} />;
};
