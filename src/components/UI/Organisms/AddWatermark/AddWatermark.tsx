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
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/local-storage";

// Locales
import { useTranslation } from "react-i18next";

// Constants
import { APP_NAME_SHORT } from "@/constants/app";
import { ACCEPTED_IMAGE_FORMAT_LIST, CanvasTypeList } from "@/constants/images";

const lowercaseAppName = APP_NAME_SHORT.toLowerCase();
const LS_WATERMARK_TYPE = `${lowercaseAppName}WatermarkType`;
const LS_WATERMARK_TEXT = `${lowercaseAppName}WatermarkText`;
const LS_WATERMARK_IMG = `${lowercaseAppName}WatermarkImg`;

const AddWatermark: React.FC = () => {
  const defaultWatermarkType: WatermarkType =
    (readFromLocalStorage(LS_WATERMARK_TYPE) as WatermarkType) ||
    WatermarkType.Text;
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [uploadedImageName, setUploadedImageName] = useState<string>();
  const [canvasType, setCanvasType] = useState<CanvasTypeList>(
    CanvasTypeList.JPG
  );
  const [watermarkType, setWatermarkType] =
    useState<WatermarkType>(defaultWatermarkType);
  const [watermarkText, setWatermarkText] = useState<string>("My Watermark");
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

  const handleWatermarkType = (type: WatermarkType) => {
    setWatermarkType(type as WatermarkType);
    writeToLocalStorage(LS_WATERMARK_TYPE, type);
  };

  const handleTextWatermark = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWatermarkText(event.target.value);

    writeToLocalStorage(LS_WATERMARK_TEXT, event.target.value);
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
        const uploadedImageHalfHeight = uploadedImage!.height * 0.5;
        const uploadedImageHalfWidth = uploadedImage!.width * 0.5;
        if (
          image.width > image.height &&
          image.width > uploadedImageHalfWidth
        ) {
          image.width = uploadedImageHalfWidth;
          image.height = uploadedImageHalfWidth / aspectRatio;
        } else if (
          image.height > image.width &&
          image.height > uploadedImageHalfHeight
        ) {
          image.height = uploadedImageHalfHeight;
          image.width = uploadedImageHalfHeight * aspectRatio;
        } else {
          if (uploadedImage!.width > uploadedImage!.height) {
            image.height = uploadedImageHalfHeight;
            image.width = uploadedImageHalfHeight * aspectRatio;
          } else {
            image.width = uploadedImageHalfWidth;
            image.height = uploadedImageHalfWidth * aspectRatio;
          }
        }

        setWatermarkImage(image);

        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext("2d");
        ctx!.drawImage(image, 0, 0, image.width, image.height);
        const imageDataBase64 = canvas.toDataURL("image/png");
        writeToLocalStorage(LS_WATERMARK_IMG, imageDataBase64);
      };
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (watermarkType === WatermarkType.Text) {
      setWatermarkImage(null);
      const storedWatermarkText = readFromLocalStorage(
        LS_WATERMARK_TEXT
      ) as string;
      setWatermarkText(storedWatermarkText);
    } else if (watermarkType === WatermarkType.Image) {
      const storedImageDataBase64 = readFromLocalStorage(
        LS_WATERMARK_IMG
      ) as string;

      if (storedImageDataBase64 && !watermarkImage) {
        const image = new Image();
        image.src = storedImageDataBase64;
        setWatermarkImage(image);
      }
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
    watermarkText,
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
          (watermarkType === WatermarkType.Text ? Number(fontSize) / 3 : 0);
        break;
      case "top-left":
        x = 15;
        y = watermarkType === WatermarkType.Text ? parseInt(fontSize, 15) : 15;
        break;
      case "top-right":
        x = uploadedImage.width - 15;
        y = watermarkType === WatermarkType.Text ? parseInt(fontSize, 15) : 15;
        ctx.textAlign = "right";
        break;
      case "bottom-left":
        x = 15;
        y =
          uploadedImage.height -
          15 -
          +(watermarkType === WatermarkType.Text ? Number(fontSize) / 5 : 0);
        break;
      case "bottom-right":
        x = uploadedImage.width - 15;
        y =
          uploadedImage.height -
          15 -
          +(watermarkType === WatermarkType.Text ? Number(fontSize) / 5 : 0);
        ctx.textAlign = "right";
        break;
    }

    if (watermarkType === WatermarkType.Text) {
      ctx.fillText(watermarkText, x, y);
    } else if (watermarkType === WatermarkType.Image && watermarkImage) {
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
                defaultActiveKey={watermarkType}
                id="watermark-type-tab"
                className="add-watermark__tabs w-100"
                onSelect={(type) => handleWatermarkType(type as WatermarkType)}
                fill
              >
                <Tab
                  eventKey={WatermarkType.Text}
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
                            value={watermarkText}
                            onChange={handleTextWatermark}
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
                  eventKey={WatermarkType.Image}
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
                            placeholder="Ciao"
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
                  isLoading ? "add-watermark__spinner-bg" : ""
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
