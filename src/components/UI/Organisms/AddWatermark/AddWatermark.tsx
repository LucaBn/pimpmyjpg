import React, { useState, useEffect, useRef } from "react";

// Components
import {
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Tabs,
  Tab,
  Container,
} from "react-bootstrap";
import DropFileInput from "@/components/UI/Molecules/DropFileInput/DropFileInput";

// Locales
// import { useTranslation } from "react-i18next";

enum WatermarkType {
  Text = "text",
  Image = "image",
}

enum FontFamilyType {
  Arial = "Arial",
  Monospace = "Monospace",
  Roboto = "Roboto",
  Georgia = "Georgia",
  Cursive = "Cursive",
}

enum TextColorType {
  White = "#fff",
  Black = "#000",
}

enum WatermarkPositionType {
  Center = "center",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right",
}

const AddWatermark: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
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

  const optionsRef = useRef<HTMLDivElement>(null);

  // const { t } = useTranslation("common");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);
      image.onload = () => setUploadedImage(image);
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
    if (watermarkType === "text") {
      setWatermarkImage(null);
    }
    applyWatermark();
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

    const url = canvas.toDataURL("image/jpeg");
    setPreviewUrl(url);
  };

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <div className="d-flex flex-column align-items-center gap-3 text-start">
          <DropFileInput
            label="Drop Here"
            handleImageChange={handleImageChange}
          />
          {/* Select Watermark type */}
          <div ref={optionsRef}>
            {uploadedImage && (
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
                  title="Text"
                  className="add-watermark__tabs-tab mt-3"
                >
                  <Container>
                    <Row className="gy-3">
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label htmlFor="watermark-text">
                            Watermark Text
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
                          <Form.Label htmlFor="font-size">Font size</Form.Label>
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
                            Font family
                          </Form.Label>
                          <Form.Select
                            id="font-family"
                            aria-label="Font Family"
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
                          <Form.Label htmlFor="text-color">Colour</Form.Label>
                          <Form.Select
                            id="text-color"
                            aria-label="Colour"
                            value={textColor}
                            onChange={(e) =>
                              setTextColor(e.target.value as TextColorType)
                            }
                          >
                            <option value="#fff">White</option>
                            <option value="#000">Black</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={8}>
                        <Form.Group>
                          <Form.Label htmlFor="watermark-txt-opacity">
                            Opacity
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
                              aria-labelledby="Opacity"
                              className="me-1"
                            />
                            <InputGroup.Text>%</InputGroup.Text>
                          </InputGroup>
                          <Form.Control
                            id="watermark-opacity"
                            type="range"
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
                            Watermark position
                          </Form.Label>
                          <Form.Select
                            id="watermark-txt-position"
                            aria-label="Watermark position"
                            value={watermarkPosition}
                            onChange={(e) =>
                              setWatermarkPosition(
                                e.target.value as WatermarkPositionType
                              )
                            }
                          >
                            <option value="center">Center</option>
                            <option value="top-left">Top Left</option>
                            <option value="top-right">Top Right</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="bottom-right">Bottom Right</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Tab>
                <Tab
                  eventKey="image"
                  title="Image"
                  className="add-watermark__tabs-tab mt-3"
                >
                  <Container>
                    <Row className="gy-3">
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label htmlFor="watermark-image">
                            Watermark Image
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
                            Opacity
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
                              aria-labelledby="Opacity"
                              className="me-1"
                            />
                            <InputGroup.Text>%</InputGroup.Text>
                          </InputGroup>
                          <Form.Control
                            id="watermark-img-opacity"
                            type="range"
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
                            Watermark position
                          </Form.Label>
                          <Form.Select
                            id="watermark-img-position"
                            aria-label="Watermark position"
                            value={watermarkPosition}
                            onChange={(e) =>
                              setWatermarkPosition(
                                e.target.value as WatermarkPositionType
                              )
                            }
                          >
                            <option value="center">Center</option>
                            <option value="top-left">Top Left</option>
                            <option value="top-right">Top Right</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="bottom-right">Bottom Right</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Tab>
              </Tabs>
            )}
          </div>
          {previewUrl && (
            <div>
              <img
                src={previewUrl}
                alt="Watermarked Preview"
                className="add-watermark__preview rounded mt-4 mw-100"
              />
              <a
                href={previewUrl}
                download="watermarked-image.jpg"
                className="text-decoration-none"
              >
                <Button className="d-block mt-3 mx-auto">Download Image</Button>
              </a>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AddWatermark;
