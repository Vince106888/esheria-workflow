import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import "./src/styles/architecture-theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
