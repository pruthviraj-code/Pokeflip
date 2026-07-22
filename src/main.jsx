import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ThemeProvider from "./context/ThemeContext.jsx";
import SettingProvider from "./context/SettingContext.jsx";

import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <SettingProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SettingProvider>
    </BrowserRouter>
  </StrictMode>
);
