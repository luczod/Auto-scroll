import React from "react";
import ReactDOM from "react-dom/client";
import ProvidersUseQuery from "./include/queryClient";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./include/ui/toaster";
import { router } from "./routes";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Toaster />
    <ProvidersUseQuery>
      <RouterProvider router={router} />
    </ProvidersUseQuery>
  </React.Fragment>
);
