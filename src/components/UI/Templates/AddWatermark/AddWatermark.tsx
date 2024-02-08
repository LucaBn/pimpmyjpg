import React, { useState } from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";

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
  const [opacity, setOpacity] = useState("1");
  const [watermarkPosition, setWatermarkPosition] = useState("center");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Aggiunto per l'anteprima

  const { t } = useTranslation("common");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    ctx.globalAlpha = parseFloat(opacity);

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

    // Download
    // canvas.toBlob((blob) => {
    //   if (blob) {
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.download = 'watermarked-image.jpg';
    //     link.href = url;
    //     link.click();
    //   }
    // }, 'image/jpeg');
  };

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12}>
          <h1 className="mt-2 mt-sm-3">{t("image-compressor.title")}</h1>
        </Col>
        <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
          <p className="white-space-pre-line">
            {t("image-compressor.description")}
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
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
          {watermarkType === "text" ? (
            <>
              <input
                type="text"
                placeholder="Watermark Text"
                value={textWatermark}
                onChange={(e) => setTextWatermark(e.target.value)}
              />
              <input
                type="number"
                placeholder="Font Size"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              />
              <input
                type="text"
                placeholder="Font Family"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
              />
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleWatermarkImageUpload}
            />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(e.target.value)}
          />
          <select
            value={watermarkPosition}
            onChange={(e) => setWatermarkPosition(e.target.value)}
          >
            <option value="center">Center</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
          <button onClick={applyWatermark}>Apply Watermark & Download</button>
          {previewUrl && (
            <div>
              <img
                src={previewUrl}
                alt="Watermarked Preview"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
              <a href={previewUrl} download="watermarked-image.jpg">
                Download Image
              </a>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddWatermark;
