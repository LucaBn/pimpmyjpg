import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";

// CSS
import "./index.css";

const router = createBrowserRouter([
  {
    path: ":language",
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "image-compressor",
        element: <div>Image Compressor</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
