import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { OcrApp } from "@/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OcrApp />
  </StrictMode>
);
