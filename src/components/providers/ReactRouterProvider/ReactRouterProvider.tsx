import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import App from "@/components/App/App";
import FeatureSelector from "@/components/UI/Templates/FeatureSelector/FeatureSelector";
import ImageCompressor from "@/components/UI/Templates/ImageCompressor/ImageCompressor";

export const ReactRouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<FeatureSelector />} />
          <Route path=":language">
            <Route index element={<FeatureSelector />} />
            <Route path="image-compressor" element={<ImageCompressor />} />
            <Route path="*" element={<div>404</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
