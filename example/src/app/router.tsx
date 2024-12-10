import { paths } from "@/lib/path";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // need to install react-router-dom

const createRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing-route");
        return { Component: LandingRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const router = createRouter();

  return <RouterProvider router={router} />;
};
