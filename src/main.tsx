import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

// Components
import App from "@/components/App/App";
import ImageCompressor from "@/components/UI/Templates/ImageCompressor/ImageCompressor";

// Providers
import { ThemeProvider } from "@/components/providers/ThemeProvider/ThemeProvider";

// Localization
import "@/i18n";

// CSS
import "@/styles/index.scss";

const RedirectComponent = () => <Navigate to="/en" replace />;

const Providers = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectComponent />} />
          <Route path=":language" element={<App />}>
            <Route index element={<div>Select feature</div>} />
            <Route path="image-compressor" element={<ImageCompressor />} />
            <Route path="*" element={<div>404</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
