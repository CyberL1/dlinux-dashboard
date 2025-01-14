import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Containers, {
  Loader as ContainersLoader,
} from "./pages/containers/index.tsx";
import ContainerPage, {
  Loader as ContainerPageLoader,
} from "./pages/containers/[name].tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App error />,
    children: [
      {
        path: "/containers",
        element: <Containers />,
        loader: ContainersLoader,
      },
      {
        path: "/containers/:name",
        element: <ContainerPage />,
        loader: ContainerPageLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
