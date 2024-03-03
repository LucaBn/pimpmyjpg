import React, { useState, useEffect, useRef } from "react";

// Components
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Form,
  InputGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import DropFileInput from "@/components/UI/Molecules/DropFileInput/DropFileInput";

// Providers
import { useUsageCounter } from "@/components/providers/UsageCounterProvider";

// Typings
import {
  FontFamilyType,
  TextColorType,
  WatermarkPositionType,
  WatermarkType,
} from "@/typings/watermarkOptions";

// Utils
import { getCleanFileName } from "@/utils/strings";

// Locales
import { useTranslation } from "react-i18next";

// Constants
import { ACCEPTED_IMAGE_FORMAT_LIST, CanvasTypeList } from "@/constants/images";

const AddWatermark: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [uploadedImageName, setUploadedImageName] = useState<string>();
  const [canvasType, setCanvasType] = useState<CanvasTypeList>(
    CanvasTypeList.JPG
  );
  const [watermarkType, setWatermarkType] = useState<WatermarkType>(
    WatermarkType.Text
  );
  const [textWatermark, setTextWatermark] = useState<string>("My Watermark");
  const [watermarkImage, setWatermarkImage] = useState<HTMLImageElement | null>(
    null
  );
  const [fontSize, setFontSize] = useState<string>("45");
  const [fontFamily, setFontFamily] = useState<FontFamilyType>(
    FontFamilyType.Arial
  );
  const [textColor, setTextColor] = useState<TextColorType>(
    TextColorType.White
  );
  const [opacity, setOpacity] = useState<number>(75);
  const [watermarkPosition, setWatermarkPosition] =
    useState<WatermarkPositionType>(WatermarkPositionType.Center);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  const { updateUsageCounter } = useUsageCounter();

  const { t } = useTranslation("common");

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
        const adaptedFontSize = String(Math.floor(image.width / 10)); // Approximation
        setFontSize(adaptedFontSize);
        setUploadedImage(image);
        setUploadedImageName(imageName);
      };
    }
  };

  const handleWatermarkImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);
      image.onload = () => {
        // Resize watermark image if needed
        const aspectRatio = image.width / image.height;
        if (
          image.width > image.height &&
          image.width > uploadedImage!.width * 0.5
        ) {
          image.width = uploadedImage!.width * 0.5;
          image.height = image.width / aspectRatio;
        } else if (
          image.height > image.width &&
          image.height > uploadedImage!.height * 0.5
        ) {
          image.height = uploadedImage!.height * 0.5;
          image.width = image.height * aspectRatio;
        }
        setWatermarkImage(image);
      };
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (watermarkType === "text") {
      setWatermarkImage(null);
    }
    const handler = setTimeout(() => {
      applyWatermark();
    }, 50);

    return () => {
      clearTimeout(handler);
    };
  }, [
    uploadedImage,
    watermarkType,
    textWatermark,
    watermarkImage,
    fontSize,
    fontFamily,
    textColor,
    opacity,
    watermarkPosition,
  ]);

  useEffect(() => {
    // Scroll to Options
    if (optionsRef.current) {
      optionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [uploadedImage]);

  const applyWatermark = () => {
    if (!uploadedImage) return;

    const canvas = document.createElement("canvas");
    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(uploadedImage, 0, 0);
    ctx.globalAlpha = parseFloat(String(opacity / 100));

    // Set text properties
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    // ctx.shadowColor = "#000";
    // ctx.shadowBlur = 4;
    // ctx.shadowOffsetX = 2;
    // ctx.shadowOffsetY = 2;

    let x = 0;
    let y = 0;
    switch (watermarkPosition) {
      case "center":
        ctx.textAlign = "center";
        x = uploadedImage.width / 2;
        y =
          uploadedImage.height / 2 +
          (watermarkType === "text" ? Number(fontSize) / 3 : 0);
        break;
      case "top-left":
        x = 15;
        y = watermarkType === "text" ? parseInt(fontSize, 15) : 15;
        break;
      case "top-right":
        x = uploadedImage.width - 15;
        y = watermarkType === "text" ? parseInt(fontSize, 15) : 15;
        ctx.textAlign = "right";
        break;
      case "bottom-left":
        x = 15;
        y =
          uploadedImage.height -
          15 -
          +(watermarkType === "text" ? Number(fontSize) / 5 : 0);
        break;
      case "bottom-right":
        x = uploadedImage.width - 15;
        y =
          uploadedImage.height -
          15 -
          +(watermarkType === "text" ? Number(fontSize) / 5 : 0);
        ctx.textAlign = "right";
        break;
    }

    if (watermarkType === "text") {
      ctx.fillText(textWatermark, x, y);
    } else if (watermarkType === "image" && watermarkImage) {
      let watermarkImageWidth = watermarkImage.width;
      let watermarkImageHeight = watermarkImage.height;

      if (watermarkImageHeight > watermarkImageWidth) {
        if (
          watermarkImageHeight >= uploadedImage.height ||
          watermarkImageHeight < uploadedImage.height / 2
        ) {
          watermarkImageWidth =
            (watermarkImageWidth * (uploadedImage.height * 0.6)) /
            watermarkImageHeight;
          watermarkImageHeight = uploadedImage.height * 0.6;
        }
      } else {
        if (
          watermarkImageWidth >= uploadedImage.width ||
          watermarkImageWidth < uploadedImage.width / 2
        ) {
          watermarkImageHeight =
            (watermarkImageHeight * (uploadedImage.width * 0.6)) /
            watermarkImageWidth;
          watermarkImageWidth = uploadedImage.width * 0.6;
        }
      }

      // Adjust position for images based on selected position
      switch (watermarkPosition) {
        case "center":
          x -= watermarkImageWidth / 2;
          y -= watermarkImageHeight / 2;
          break;
        case "top-right":
          x -= watermarkImageWidth;
          break;
        case "bottom-left":
          y -= watermarkImageHeight;
          break;
        case "bottom-right":
          x -= watermarkImageWidth;
          y -= watermarkImageHeight;
          break;
      }

      ctx.drawImage(
        watermarkImage,
        x,
        y,
        watermarkImageWidth,
        watermarkImageHeight
      );
    }

    const url = canvas.toDataURL(canvasType);
    setPreviewUrl(url);
    setIsLoading(false);
  };

  const handleDownload = () => {
    updateUsageCounter();
  };

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <div className="d-flex flex-column align-items-center gap-3 text-start">
          <DropFileInput
            label={t("add-watermark.file-input")}
            handleImageChange={handleImageChange}
          />
          {/* Select Watermark type */}
          {uploadedImage && (
            <div ref={optionsRef}>
              <Tabs
                defaultActiveKey="text"
                id="watermark-type-tab"
                className="add-watermark__tabs w-100"
                onSelect={(e) => {
                  setWatermarkType(e as WatermarkType);
                }}
                fill
              >
                <Tab
                  eventKey="text"
                  title={t("add-watermark.tab-text")}
                  className="add-watermark__tabs-tab bg-tab-content mt-3 border border-top-0 rounded-bottom"
                >
                  <Container className="pb-3">
                    <Row className="gy-3">
                      <Col xs={12}>
                        {/* TODO: Create component to handle form inputs */}
                        <Form.Group>
                          <Form.Label htmlFor="watermark-text">
                            {t("add-watermark.watermark-text")}
                          </Form.Label>
                          <Form.Control
                            id="watermark-text"
                            type="text"
                            value={textWatermark}
                            onChange={(e) => setTextWatermark(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={3}>
                        <Form.Group>
                          <Form.Label htmlFor="font-size">
                            {t("add-watermark.font-size")}
                          </Form.Label>
                          <Form.Control
                            id="font-size"
                            type="number"
                            min="6"
                            max="999"
                            step="1"
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={5}>
                        <Form.Group>
                          <Form.Label htmlFor="font-family">
                            {t("add-watermark.font-family")}
                          </Form.Label>
                          <Form.Select
                            id="font-family"
                            aria-label={t("add-watermark.font-family")}
                            value={fontFamily}
                            onChange={(e) =>
                              setFontFamily(e.target.value as FontFamilyType)
                            }
                          >
                            <option value="Arial">Arial</option>
                            <option value="Monospace">Monospace</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Cursive">Cursive</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="text-color">
                            {t("add-watermark.color")}
                          </Form.Label>
                          <Form.Select
                            id="text-color"
                            aria-label={t("add-watermark.color")}
                            value={textColor}
                            onChange={(e) =>
                              setTextColor(e.target.value as TextColorType)
                            }
                          >
                            <option value="#fff">
                              {t("add-watermark.color-options.white")}
                            </option>
                            <option value="#000">
                              {t("add-watermark.color-options.black")}
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={8}>
                        <Form.Group>
                          <Form.Label htmlFor="watermark-txt-opacity">
                            {t("add-watermark.opacity")}
                          </Form.Label>
                          <InputGroup className="mb-1">
                            <Form.Control
                              type="number"
                              min="0"
                              max="100"
                              step="1"
                              value={String(
                                opacity
                              )} /* Need this to prevent leading zeroes, hope it works correctly */
                              onChange={(e) =>
                                setOpacity(Number(e.target.value))
                              }
                              aria-labelledby="watermark-txt-opacity"
                              className="me-1"
                            />
                            <InputGroup.Text>%</InputGroup.Text>
                          </InputGroup>
                          <Form.Range
                            id="watermark-txt-opacity"
                            min="0"
                            max="100"
                            step="1"
                            value={opacity}
                            onChange={(e) => setOpacity(Number(e.target.value))}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="watermark-txt-position">
                            {t("add-watermark.watermark-position")}
                          </Form.Label>
                          <Form.Select
                            id="watermark-txt-position"
                            aria-label={t("add-watermark.watermark-position")}
                            value={watermarkPosition}
                            onChange={(e) =>
                              setWatermarkPosition(
                                e.target.value as WatermarkPositionType
                              )
                            }
                          >
                            <option value="center">
                              {t(
                                "add-watermark.watermark-position-options.center"
                              )}
                            </option>
                            <option value="top-left">
                              {t(
                                "add-watermark.watermark-position-options.top-left"
                              )}
                            </option>
                            <option value="top-right">
                              {t(
                                "add-watermark.watermark-position-options.top-right"
                              )}
                            </option>
                            <option value="bottom-left">
                              {t(
                                "add-watermark.watermark-position-options.bottom-left"
                              )}
                            </option>
                            <option value="bottom-right">
                              {t(
                                "add-watermark.watermark-position-options.bottom-right"
                              )}
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Tab>
                <Tab
                  eventKey="image"
                  title={t("add-watermark.tab-image")}
                  className="add-watermark__tabs-tab bg-tab-content mt-3 border border-top-0 rounded-bottom"
                >
                  <Container className="pb-3">
                    <Row className="gy-3">
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label htmlFor="watermark-image">
                            {t("add-watermark.watermark-image")}
                          </Form.Label>
                          <Form.Control
                            id="watermark-image"
                            type="file"
                            accept="image/*"
                            onChange={handleWatermarkImageUpload}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={8}>
                        <Form.Group>
                          <Form.Label htmlFor="watermark-img-opacity">
                            {t("add-watermark.opacity")}
                          </Form.Label>
                          <InputGroup className="mb-1">
                            <Form.Control
                              type="number"
                              min="0"
                              max="100"
                              step="1"
                              value={String(
                                opacity
                              )} /* Need this to prevent leading zeroes, hope it works correctly */
                              onChange={(e) =>
                                setOpacity(Number(e.target.value))
                              }
                              aria-labelledby="watermark-img-opacity"
                              className="me-1"
                            />
                            <InputGroup.Text>%</InputGroup.Text>
                          </InputGroup>
                          <Form.Range
                            id="watermark-img-opacity"
                            min="0"
                            max="100"
                            step="1"
                            value={opacity}
                            onChange={(e) => setOpacity(Number(e.target.value))}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="watermark-img-position">
                            {t("add-watermark.watermark-position")}
                          </Form.Label>
                          <Form.Select
                            id="watermark-img-position"
                            aria-label={t("add-watermark.watermark-position")}
                            value={watermarkPosition}
                            onChange={(e) =>
                              setWatermarkPosition(
                                e.target.value as WatermarkPositionType
                              )
                            }
                          >
                            <option value="center">
                              {t(
                                "add-watermark.watermark-position-options.center"
                              )}
                            </option>
                            <option value="top-left">
                              {t(
                                "add-watermark.watermark-position-options.top-left"
                              )}
                            </option>
                            <option value="top-right">
                              {t(
                                "add-watermark.watermark-position-options.top-right"
                              )}
                            </option>
                            <option value="bottom-left">
                              {t(
                                "add-watermark.watermark-position-options.bottom-left"
                              )}
                            </option>
                            <option value="bottom-right">
                              {t(
                                "add-watermark.watermark-position-options.bottom-right"
                              )}
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Tab>
              </Tabs>
            </div>
          )}
          {previewUrl && (
            <>
              <div
                className={`position-relative ${
                  isLoading ? "add-filter__spinner-bg" : ""
                }`}
              >
                <img
                  src={previewUrl}
                  alt={t("add-watermark.watermarked-preview")}
                  className="add-watermark__preview rounded d-block mx-auto mw-100"
                  draggable={false}
                />
                {isLoading && (
                  <Spinner
                    animation="border"
                    role="status"
                    className="add-watermark__spinner"
                  >
                    <span className="visually-hidden">{t("loading")}</span>
                  </Spinner>
                )}
              </div>
              <a
                href={previewUrl}
                download={`${uploadedImageName}_watermarked.${
                  canvasType === "image/png" ? "png" : "jpg"
                }`}
                className="text-decoration-none"
                onClick={handleDownload}
              >
                <Button className="d-block mx-auto">
                  {t("add-watermark.download")}
                </Button>
              </a>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AddWatermark;
