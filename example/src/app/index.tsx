import { AppProvider } from "./provider";
import { AppRouter } from "./router";

export const OcrApp = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
