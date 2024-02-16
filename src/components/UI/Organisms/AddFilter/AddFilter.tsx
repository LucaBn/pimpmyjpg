import React, { useState, useEffect, useRef } from "react";

// Components
import { Container, Row, Col, Button } from "react-bootstrap";
import DropFileInput from "@/components/UI/Molecules/DropFileInput/DropFileInput";

// Locales
import { useTranslation } from "react-i18next";

const EFFECT_CSS_TABLE: {
  [key: string]: string;
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filtersRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation("common");

  const toggleFilter = (effect: string) => {
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
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);
      image.onload = () => setUploadedImage(image);
    }
  };

  function overlayBlend(base: number, blend: number) {
    base /= 255;
    blend /= 255;
    // return base <= 0.5 ? 2 * base * blend : 1 - 2 * (1 - base) * (1 - blend);
    return Math.round(
      255 * (base <= 0.5 ? 2 * base * blend : 1 - 2 * (1 - base) * (1 - blend))
    );
  }

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

        if (selectedFilters.includes("mexico")) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            // Converti il colore #b77d21 in RGB
            const overlayColor = { r: 0xb7, g: 0x7d, b: 0x21 };

            // Calcola l'effetto overlay per ogni canale
            data[i] = overlayBlend(data[i], overlayColor.r); // R
            data[i + 1] = overlayBlend(data[i + 1], overlayColor.g); // G
            data[i + 2] = overlayBlend(data[i + 2], overlayColor.b); // B
          }

          // Applica i dati dell'immagine modificati al canvas
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
    return selectedFilters.includes(effect) ? "primary" : "outline-primary";
  };

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
                      md={3}
                      lg={2}
                      onClick={() => toggleFilter(effect)}
                    >
                      <Button
                        className="ratio ratio-16x9"
                        variant={getVariant(effect)}
                      >
                        <div className="d-flex align-items-center justify-content-center fs-5">
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
                  alt="Watermarked Preview" /* TODO: translate line */
                  className="add-filter__preview rounded mw-100"
                />
                <a
                  href={previewUrl}
                  download="filtered-image.jpg"
                  className="text-decoration-none"
                >
                  <Button className="d-block mt-3 mx-auto">
                    {t("add-filter.download")}
                  </Button>
                </a>
              </div>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AddFilter;
