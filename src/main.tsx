import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "src/layout/home/Home.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./layout/themes.tsx";
import UserSystem from "./layout/user-system/index.tsx";
import { AuthProvider } from "./features/auth/AuthProvider.tsx";
import { SharedVideoProvider } from "src/features/videos";
import { NotificationStackProvider } from "src/features/notifications/context/NotificationStackProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user-system",
    element: <UserSystem />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SharedVideoProvider>
          <NotificationStackProvider>
            <RouterProvider router={router} />
          </NotificationStackProvider>
        </SharedVideoProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
