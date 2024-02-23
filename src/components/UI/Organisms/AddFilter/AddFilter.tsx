import React, { useState, useEffect, useRef } from "react";

// Components
import { Container, Row, Col, Button } from "react-bootstrap";
import DropFileInput from "@/components/UI/Molecules/DropFileInput/DropFileInput";

// Providers
import { useUsageCounter } from "@/components/providers/UsageCounterProvider";

// Locales
import { useTranslation } from "react-i18next";

// Utils
import { overlayBlend } from "@/utils/colors";
import { getCleanFileName } from "@/utils/strings";

enum FilterList {
  BlackAndWhite = "black-and-white",
  Sepia = "sepia",
  DeepFried = "deep-fried",
  Mexico = "mexico",
  Blurred = "blurred",
  HighContrast = "high-contrast",
}

const EFFECT_CSS_TABLE: {
  [key in FilterList]: string;
} = {
  "black-and-white": "grayscale(100%)",
  sepia: "sepia(100%)",
  "deep-fried": "contrast(2.5) saturate(2.5) brightness(1.5)",
  mexico: "",
  blurred: "blur(10px)",
  "high-contrast": "contrast(2.5)",
};

const AddFilter: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [uploadedImageName, setUploadedImageName] = useState<string>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterList[]>([]);
  const filtersRef = useRef<HTMLDivElement>(null);

  const { updateUsageCounter } = useUsageCounter();

  const { t } = useTranslation("common");

  const toggleFilter = (effect: FilterList) => {
    // setSelectedFilters((currentValues) => {
    //   if (currentValues.includes(effect)) {
    //     return currentValues.filter((item) => item !== effect);
    //   } else {
    //     return [...currentValues, effect];
    //   }
    // });
    setSelectedFilters((currentValues) => {
      if (currentValues.includes(effect)) {
        return [];
      } else {
        return [effect];
      }
    });
    // TODO: Think of a way to handle multiple effects
  };

  useEffect(() => {
    applyFilter();
  }, [uploadedImage, selectedFilters]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageName = getCleanFileName(event.target?.files[0].name) || "_";
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);
      image.onload = () => {
        setUploadedImage(image);
        setUploadedImageName(imageName);
      };
    }
  };

  const applyFilter = () => {
    if (uploadedImage) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = uploadedImage.width;
        canvas.height = uploadedImage.height;
        if (selectedFilters) {
          let filters = "";
          selectedFilters.forEach((filter) => {
            filters += EFFECT_CSS_TABLE[filter];
          });
          ctx.filter = filters;
        }
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

        if (selectedFilters.includes(FilterList.Mexico)) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const overlayColor = { r: 0xb7, g: 0x7d, b: 0x21 };

            data[i] = overlayBlend(data[i], overlayColor.r); // R
            data[i + 1] = overlayBlend(data[i + 1], overlayColor.g); // G
            data[i + 2] = overlayBlend(data[i + 2], overlayColor.b); // B
          }

          ctx.putImageData(imageData, 0, 0);
        }

        const url = canvas.toDataURL("image/jpeg");
        setPreviewUrl(url);
      }
    }
  };

  useEffect(() => {
    // Scroll to Filter section
    if (filtersRef.current) {
      filtersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [uploadedImage]);

  const getVariant = (effect: string) => {
    return selectedFilters.includes(effect as FilterList)
      ? "primary"
      : "outline-primary";
  };

  const handleDownload = () => {
    updateUsageCounter();
  };

  const hasFilter = selectedFilters.length > 0;

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <div className="d-flex flex-column align-items-center gap-3 text-start">
          <DropFileInput
            label={t("add-filter.file-input")}
            handleImageChange={handleImageChange}
          />
          {previewUrl && (
            <>
              <Container ref={filtersRef}>
                <Row className="g-3 justify-content-center">
                  {Object.keys(EFFECT_CSS_TABLE).map((effect) => (
                    <Col
                      xs={6}
                      sm={4}
                      md={3}
                      lg={2}
                      onClick={() => toggleFilter(effect as FilterList)}
                      key={effect}
                    >
                      <Button
                        className="ratio ratio-16x9"
                        variant={getVariant(effect)}
                      >
                        <div className="d-flex align-items-center justify-content-center fs-5 lh-1 px-1">
                          {t(`add-filter.filter-list.${effect}`)}
                        </div>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Container>
              <div>
                <img
                  src={previewUrl}
                  alt={t("add-filter.filtered-preview")}
                  className="add-filter__preview rounded mw-100 mb-3"
                  draggable={false}
                />
                {hasFilter ? (
                  <a
                    href={previewUrl}
                    download={`${uploadedImageName}_filtered.jpg`}
                    className="text-decoration-none"
                    onClick={handleDownload}
                  >
                    <Button className="d-block mx-auto">
                      {t("add-filter.download")}
                    </Button>
                  </a>
                ) : (
                  <small className="d-block mx-auto text-center">
                    {t("add-filter.apply-filter")}
                  </small>
                )}
              </div>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AddFilter;
