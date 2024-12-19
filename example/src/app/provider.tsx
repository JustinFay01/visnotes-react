import useDynamicIcon from "@/hooks/use-dynamic-icon";
import { queryConfig } from "@/lib/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const appQueryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export function AppProvider({ children }: React.PropsWithChildren) {
  useDynamicIcon();

  return (
    <QueryClientProvider client={appQueryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
