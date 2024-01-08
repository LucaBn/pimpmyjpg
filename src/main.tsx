import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import App from "@/components/App/App";
import ImageCompressor from "./components/UI/Templates/ImageCompressor/ImageCompressor";

// Providers
import { ThemeProvider } from "@/components/providers/ThemeProvider/ThemeProvider";

// CSS
import "@/styles/index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "image-compressor",
        element: <ImageCompressor />,
      },
    ],
  },
]);

const Providers = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
