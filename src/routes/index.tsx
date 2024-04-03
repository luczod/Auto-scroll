import App from "@/App";
import Page404 from "@/components/notFound";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
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
