import React from "react";
import ReactDOM from "react-dom/client";
import Home from "src/layout/home/Home.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./layout/themes.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </React.StrictMode>
);
