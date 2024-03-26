import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import App from "./App";
import ProvidersUseQuery from "./include/queryClient";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "./include/ui/toaster";
import Page404 from "./components/notFound";

const router = createBrowserRouter([
  {
    path: "/:station",
    element: <App />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Toaster />
    <ProvidersUseQuery>
      <RouterProvider router={router} />
    </ProvidersUseQuery>
  </React.Fragment>
);
