import { paths } from "@/lib/path";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // need to install react-router-dom
import { AppRoot } from "./routes/root";
import { Authenticated } from "@/lib/auth/authenticated";
import { AuthProvider } from "@/lib/auth/auth-provider";

const createRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing-route");
        return { Component: LandingRoute };
      },
    },
    {
      path: paths.app.root.path,
      element: (
        <AuthProvider>
          <Authenticated>
            <AppRoot />
          </Authenticated>
        </AuthProvider>
      ),
      children: [
        {
          path: paths.app.dashboard.path,
          lazy: async () => {
            const { DashboardRoute } = await import("./routes/dashboard-route");
            return { Component: DashboardRoute };
          },
        },
        {
          path: paths.app.wordcloud.path,
          lazy: async () => {
            const { WordcloudRoute } = await import("./routes/wordcloud-route");
            return { Component: WordcloudRoute };
          },
        },
        {
          path: paths.app.notes.path,
          lazy: async () => {
            const { NotesRoute } = await import("./routes/notes-route");
            return { Component: NotesRoute };
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
