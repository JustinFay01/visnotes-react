import { paths } from "@/lib/path";
import OcrDropzone from "@/ui/components/form/dropzone/dropzone";
import { BasicLayout } from "@/ui/layout/blocks";
import { Stack, Typography } from "@mui/material";
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
      path: `${paths.home.path}/test`,
      element: (
        <BasicLayout>
          <Stack
            padding={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "75vh",
            }}
          >
            <OcrDropzone>
              <Typography>Drop files here</Typography>
            </OcrDropzone>
          </Stack>
        </BasicLayout>
      ),
    },
  ]);

export const AppRouter = () => {
  const router = createRouter();

  return <RouterProvider router={router} />;
};
