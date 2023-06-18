import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Home from "src/layout/home/Home.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./layout/themes.tsx";
import UserSystem from "./layout/user-system/index.tsx";
import { AuthProvider } from "./features/auth/AuthProvider.tsx";
import ShareVideo from "./layout/share-video/index.tsx";

const router = createBrowserRouter([
  {
    path: "/share-video",
    element: <ShareVideo />,
  },
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
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
