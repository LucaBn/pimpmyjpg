import React, { useState, useEffect, useRef } from "react";

// Components
import { Row, Col, Button, Spinner } from "react-bootstrap";
import DropFileInput from "@/components/UI/Molecules/DropFileInput/DropFileInput";
import ImageFromUrl from "@/components/UI/Molecules/ImageFromUrl/ImageFromUrl";

// Providers
import { useUsageCounter } from "@/components/providers/UsageCounterProvider";

// Locales
import { useTranslation } from "react-i18next";

// Utils
import { overlayBlend } from "@/utils/colors";
import { getCleanFileName } from "@/utils/strings";

// Constants
import { ACCEPTED_IMAGE_FORMAT_LIST, CanvasTypeList } from "@/constants/images";

enum FilterList {
  BlackAndWhite = "black-and-white",
  Blurred = "blurred",
  DeepFried = "deep-fried",
  HighContrast = "high-contrast",
  Mexico = "mexico",
  Pixels = "pixels",
  PopArt = "pop-art",
  Sepia = "sepia",
  Terminal = "terminal",
}

const EFFECT_CSS_TABLE: {
  [key in FilterList]: string;
} = {
  "black-and-white": "grayscale(100%)",
  blurred: "",
  "deep-fried": "contrast(2.5) saturate(2.5) brightness(1.5)",
  "high-contrast": "contrast(2.5)",
  mexico: "saturate(0.5)",
  pixels: "",
  "pop-art": "",
  sepia: "sepia(100%)",
  terminal: "sepia(100%) hue-rotate(75deg) saturate(0.1)",
};

const AddFilter: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [uploadedImageName, setUploadedImageName] = useState<string>();
  const [canvasType, setCanvasType] = useState<CanvasTypeList>(
    CanvasTypeList.JPG
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        setIsLoading(true);
        return [effect];
      }
    });
    // TODO: Think of a way to handle multiple effects
  };

  useEffect(() => {
    setTimeout(() => {
      applyFilter().then(() => setIsLoading(false));
    }, 0);
  }, [uploadedImage, selectedFilters]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageName = getCleanFileName(event.target?.files[0].name) || "_";
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);

      const fileType = ACCEPTED_IMAGE_FORMAT_LIST.includes(
        event.target.files[0].type
      )
        ? (event.target.files[0].type as CanvasTypeList)
        : CanvasTypeList.JPG;
      setCanvasType(fileType);

      image.onload = () => {
        setUploadedImage(image);
        setUploadedImageName(imageName);
      };
    }
  };

  const applyFilter = async () => {
    if (uploadedImage) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = uploadedImage.width;
        canvas.height = uploadedImage.height;
        if (selectedFilters) {
          let filters = "";
          selectedFilters.forEach((filter) => {
            if (filter === "blurred") {
              const blurValue =
                uploadedImage.height > uploadedImage.width
                  ? uploadedImage.height / 150
                  : uploadedImage.width / 150;
              filters += `blur(${blurValue}px)`;
            } else if (filter === "pop-art") {
              const blurValue =
                uploadedImage.height < uploadedImage.width
                  ? uploadedImage.height / 250
                  : uploadedImage.width / 250;
              filters += `blur(${blurValue}px)`;
            } else {
              filters += EFFECT_CSS_TABLE[filter];
            }
          });
          ctx.filter = filters;
        }

        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

        if (selectedFilters.includes(FilterList.Pixels)) {
          const originalWidth = uploadedImage.width;
          const originalHeight = uploadedImage.height;

          const basePixelSize = 60;

          let pixelWidth = basePixelSize;
          let pixelHeight = (basePixelSize * originalHeight) / originalWidth;

          if (originalHeight > originalWidth) {
            pixelHeight = basePixelSize;
            pixelWidth = (basePixelSize * originalWidth) / originalHeight;
          }

          ctx.imageSmoothingEnabled = false;

          ctx.clearRect(0, 0, originalWidth, originalHeight);
          ctx.drawImage(uploadedImage, 0, 0, pixelWidth, pixelHeight);
          ctx.drawImage(
            ctx.canvas,
            0,
            0,
            pixelWidth,
            pixelHeight,
            0,
            0,
            originalWidth,
            originalHeight
          );
        } else if (selectedFilters.includes(FilterList.Mexico)) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const overlayColor = { r: 0xb7, g: 0x7d, b: 0x21 };

            data[i] = overlayBlend(data[i], overlayColor.r); // R
            data[i + 1] = overlayBlend(data[i + 1], overlayColor.g); // G
            data[i + 2] = overlayBlend(data[i + 2], overlayColor.b); // B
          }

          ctx.putImageData(imageData, 0, 0);
        } else if (
          selectedFilters.includes(FilterList.Terminal) ||
          selectedFilters.includes(FilterList.PopArt)
        ) {
          const width = canvas.width;
          const height = canvas.height;

          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;

          let colors;

          if (selectedFilters.includes(FilterList.PopArt)) {
            colors = [
              { r: 255, g: 208, b: 0 },
              { r: 254, g: 95, b: 85 },
              { r: 67, g: 230, b: 253 },
              { r: 28, g: 124, b: 84 },
              { r: 52, g: 52, b: 52 },
            ];
          } else if (selectedFilters.includes(FilterList.Terminal)) {
            colors = [
              { r: 0, g: 50, b: 0 },
              { r: 0, g: 100, b: 0 },
              { r: 0, g: 150, b: 0 },
              { r: 0, g: 200, b: 0 },
              { r: 0, g: 250, b: 0 },
            ];
          }

          for (let i = 0; i < data.length; i += 4) {
            const green = data[i + 1];

            const closest = colors!.reduce((prev, curr) => {
              return Math.abs(curr.g - green) < Math.abs(prev.g - green)
                ? curr
                : prev;
            });

            data[i] = closest.r;
            data[i + 1] = closest.g;
            data[i + 2] = closest.b;
          }

          ctx.putImageData(imageData, 0, 0);
        }

        const url = canvas.toDataURL(canvasType);
        setPreviewUrl(url);
      }
    }
    return new Promise((resolve) => setTimeout(resolve, 0));
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
      ? "secondary"
      : "outline-secondary";
  };

  const handleDownload = () => {
    updateUsageCounter();
  };

  const hasFilter = selectedFilters.length > 0;

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <div className="d-flex flex-column align-items-md-center gap-3 text-start">
          {/* Drop picture component */}
          <DropFileInput
            label={t("add-filter.file-input")}
            handleImageChange={handleImageChange}
          />
          {/* Get picture from URL */}
          <div className="d-flex flex-column align-items-center">
            <p className="mb-0 text-center">{t("image-from-url.or")}</p>
            <ImageFromUrl handleImageChange={handleImageChange} />
          </div>
          {previewUrl && (
            <>
              <div ref={filtersRef}>
                <Row className="g-3 justify-content-center">
                  {Object.keys(EFFECT_CSS_TABLE)
                    // .sort((a, b) =>
                    //   t(`add-filter.filter-list.${a}`).localeCompare(
                    //     t(`add-filter.filter-list.${b}`)
                    //   )
                    // )
                    .map((effect) => (
                      <Col
                        key={effect}
                        className="add-filter__filters col-auto"
                      >
                        <Button
                          onClick={() => toggleFilter(effect as FilterList)}
                          className="add-filter__filter ratio ratio-16x9"
                          variant={getVariant(effect)}
                        >
                          <div className="d-flex align-items-center justify-content-center fs-5 lh-1 px-1">
                            {t(`add-filter.filter-list.${effect}`)}
                          </div>
                        </Button>
                      </Col>
                    ))}
                </Row>
              </div>
              <div
                className={`position-relative ${
                  isLoading ? "add-filter__spinner-bg" : ""
                }`}
              >
                <img
                  src={previewUrl}
                  alt={t("add-filter.filtered-preview")}
                  className="add-filter__preview rounded d-block mx-auto mw-100"
                  draggable={false}
                />
                {isLoading && (
                  <Spinner
                    animation="border"
                    role="status"
                    className="add-filter__spinner text-white"
                  >
                    <span className="visually-hidden">{t("loading")}</span>
                  </Spinner>
                )}
              </div>
              {hasFilter ? (
                <a
                  href={previewUrl}
                  download={`${uploadedImageName}_filtered.${
                    canvasType === "image/png" ? "png" : "jpg"
                  }`}
                  className="text-decoration-none"
                  onClick={handleDownload}
                >
                  <Button className="d-block mx-auto" disabled={isLoading}>
                    {t("add-filter.download")}
                  </Button>
                </a>
              ) : (
                <small className="d-block mx-auto text-center">
                  {t("add-filter.apply-filter")}
                </small>
              )}
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AddFilter;
