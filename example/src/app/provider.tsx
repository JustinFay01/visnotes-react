import useDynamicIcon from "@/hooks/use-dynamic-icon";
import { queryConfig } from "@/lib/react-query";
import { theme } from "@/lib/theme";
import { DialogsProvider } from "@/ui/dialogs";
import { CssBaseline, ThemeProvider, useColorScheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

const appQueryClient = new QueryClient({
  defaultOptions: queryConfig,
});

function App({ children }: React.PropsWithChildren) {
  const { mode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <QueryClientProvider client={appQueryClient}>
      <DialogsProvider>
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
          theme={mode === "dark" ? "dark" : "light"}
        />
      </DialogsProvider>
    </QueryClientProvider>
  );
}

export function AppProvider({ children }: React.PropsWithChildren) {
  useDynamicIcon();

  return (
    <ThemeProvider theme={theme}>
      <App>{children}</App>
    </ThemeProvider>
  );
}
