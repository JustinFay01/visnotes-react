import useDynamicIcon from "@/hooks/use-dynamic-icon";
import { queryConfig } from "@/lib/react-query";
import { createAppTheme } from "@/lib/theme";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

const appQueryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export function AppProvider({ children }: React.PropsWithChildren) {
  useDynamicIcon();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createAppTheme(prefersDarkMode ? "dark" : "light");

  return (
    <QueryClientProvider client={appQueryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover={false}
          theme={prefersDarkMode ? "dark" : "light"}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
