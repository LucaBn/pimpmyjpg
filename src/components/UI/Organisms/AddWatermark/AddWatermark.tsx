import React, { useState } from "react";

// Components
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import DropFileInput from "@/components/UI/Molecules/DropFileInput/DropFileInput";

// Locales
// import { useTranslation } from "react-i18next";

const AddWatermark: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [textWatermark, setTextWatermark] = useState("");
  const [uploadedWatermarkImage, setUploadedWatermarkImage] =
    useState<HTMLImageElement | null>(null);
  const [fontSize, setFontSize] = useState("30");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [opacity, setOpacity] = useState<number>(75);
  const [watermarkPosition, setWatermarkPosition] = useState("center");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Aggiunto per l'anteprima

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
        setUploadedWatermarkImage(image);
      };
    }
  };

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
        x = uploadedImage.width / 2;
        y = uploadedImage.height / 2;
        break;
      case "top-left":
        x = 10;
        y = parseInt(fontSize, 10);
        break;
      case "top-right":
        x = uploadedImage.width - 10;
        y = parseInt(fontSize, 10);
        ctx.textAlign = "right";
        break;
      case "bottom-left":
        x = 10;
        y = uploadedImage.height - 10;
        break;
      case "bottom-right":
        x = uploadedImage.width - 10;
        y = uploadedImage.height - 10;
        ctx.textAlign = "right";
        break;
    }

    if (watermarkType === "text") {
      ctx.fillText(textWatermark, x, y);
    } else if (watermarkType === "image" && uploadedWatermarkImage) {
      // Adjust position for images based on selected position
      switch (watermarkPosition) {
        case "center":
          x -= uploadedWatermarkImage.width / 2;
          y -= uploadedWatermarkImage.height / 2;
          break;
        case "top-right":
          x -= uploadedWatermarkImage.width;
          break;
        case "bottom-left":
          y -= uploadedWatermarkImage.height;
          break;
        case "bottom-right":
          x -= uploadedWatermarkImage.width;
          y -= uploadedWatermarkImage.height;
          break;
      }
      ctx.drawImage(uploadedWatermarkImage, x, y);
    }

    const url = canvas.toDataURL("image/jpeg");
    setPreviewUrl(url);
  };

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <div className="d-flex flex-column align-items-center gap-3">
          <DropFileInput
            label="Drop Here"
            handleImageChange={handleImageChange}
          />
          {/* Select Watermark type */}
          <div>
            <label>
              <input
                type="radio"
                value="text"
                checked={watermarkType === "text"}
                onChange={() => setWatermarkType("text")}
              />
              Text Watermark
            </label>
            <label>
              <input
                type="radio"
                value="image"
                checked={watermarkType === "image"}
                onChange={() => setWatermarkType("image")}
              />
              Image Watermark
            </label>
          </div>
          {/* Options */}
          <div className="text-start" style={{ maxWidth: 400 }}>
            {watermarkType === "text" ? (
              <Row className="g-3">
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
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={5}>
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
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={5}>
                  <Form.Group>
                    <Form.Label htmlFor="font-family">Font family</Form.Label>
                    <Form.Select
                      id="font-family"
                      aria-label="Font Family"
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                    >
                      <option value="Arial">Arial</option>
                      <option value="Monospace">Monospace</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Cursive">Cursive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={2}>
                  <Form.Group>
                    <Form.Label htmlFor="text-color">Colour</Form.Label>
                    <Form.Control
                      id="text-color"
                      className="w-100"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleWatermarkImageUpload}
                  />
                </Col>
              </Row>
            )}
            <Row className="my-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label htmlFor="watermark-opacity">Opacity</Form.Label>
                  <InputGroup className="mb-1">
                    <Form.Control
                      id="watermark-opacity"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={String(
                        opacity
                      )} /* Need this to prevent leading zeroes, hope it works correctly */
                      onChange={(e) => setOpacity(Number(e.target.value))}
                      aria-labelledby="quality"
                      className="image-compressor__quality-number me-1"
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                  <Form.Control
                    id="quality"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="mt-3">
                <Form.Group>
                  <Form.Label htmlFor="watermark-position">
                    Watermark position
                  </Form.Label>
                  <Form.Select
                    id="watermark-position"
                    aria-label="Watermark position"
                    value={watermarkPosition}
                    onChange={(e) => setWatermarkPosition(e.target.value)}
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

            <Button className="d-block mx-auto" onClick={applyWatermark}>
              Apply Watermark
            </Button>
          </div>

          {previewUrl && (
            <div>
              <img
                src={previewUrl}
                alt="Watermarked Preview"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
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
