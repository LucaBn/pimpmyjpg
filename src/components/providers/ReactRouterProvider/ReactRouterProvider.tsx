import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import App from "@/components/App/App";
import Error404 from "@/components/UI/Templates/Error404/Error404";
import FeatureSelector from "@/components/UI/Templates/FeatureSelector/FeatureSelector";
import ImageCompressor from "@/components/UI/Templates/ImageCompressor/ImageCompressor";
import AddFilter from "@/components/UI/Templates/AddFilter/AddFilter";
import AddWatermark from "@/components/UI/Templates/AddWatermark/AddWatermark";

export const ReactRouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<FeatureSelector />} />
          <Route path=":language">
            <Route index element={<FeatureSelector />} />
            <Route path="image-compressor" element={<ImageCompressor />} />
            <Route path="add-filter" element={<AddFilter />} />
            <Route path="add-watermark" element={<AddWatermark />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
