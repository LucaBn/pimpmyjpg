import React, { useState, useEffect, ChangeEvent, useRef } from "react";

// Components
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Image as ImageComponent,
  InputGroup,
  Row,
  Spinner,
  useAccordionButton,
} from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";

// Utils
import {
  calculateSize,
  compareImageSizes,
  getCleanFileName,
} from "@/utils/image-compressor";

interface ImageInfo {
  index: number;
  originalFile: File | Blob;
  file: Blob;
  name: string;
  downloaded: boolean;
}

const ImageCompressor: React.FC = () => {
  const [optionsBoxIsOpen, setOptionsBoxIsOpen] = useState<boolean>(false);
  const [inputFileValueKey, setInputFileValueKey] = useState<number>(0);
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [quality, setQuality] = useState<number>(70);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [compressedImageList, setCompressedImageList] = useState<ImageInfo[]>(
    []
  );

  const compressedImagesContainerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation("common");

  const optionsButtonText = optionsBoxIsOpen
    ? t("image-compressor.close-options")
    : t("image-compressor.open-options");
  const optionsButtonVariant = optionsBoxIsOpen ? "danger" : "success";
  const activeKey = optionsBoxIsOpen ? "0" : "";

  useEffect(() => {
    if (loadedImages === totalImages) {
      setIsLoading(false);
      setTotalImages(0);
      setLoadedImages(0);
    }
  }, [loadedImages]);

  const decoratedOnClick = useAccordionButton("0");

  const handleOptionBoxStatus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOptionsBoxIsOpen((prevValue) => !prevValue);
    decoratedOnClick(e);
  };

  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const files = ev.target.files;
    if (ev.target.files) {
      setInputFileValueKey((prevValue) => prevValue + 1); // Need this to trigger change event even if the user uploads files with the same names in different moments
    }

    if (files && files.length > 0) {
      setTotalImages(files.length);

      Array.from(files).forEach((file, index) => {
        processImage(file, index + compressedImageList.length);
      });

      // Scroll to compressed images section
      setTimeout(() => {
        if (compressedImagesContainerRef.current) {
          compressedImagesContainerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 50);
    }
  };

  const processImage = (file: File, index: number) => {
    const blobURL = URL.createObjectURL(file);
    const img = new Image();

    img.src = blobURL;
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      console.error("Cannot load image");
    };
    img.onload = () => {
      URL.revokeObjectURL(img.src);

      const [newWidth, newHeight] = calculateSize(img, maxWidth, maxHeight);

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const imageInfo: ImageInfo = {
              index: index,
              originalFile: file,
              file: blob,
              name: getCleanFileName(file.name),
              downloaded: false,
            };
            setCompressedImageList((prevValue) => [...prevValue, imageInfo]);
          }
        },
        "image/jpeg",
        quality / 100
      );

      setLoadedImages((prevValue) => prevValue + 1);
    };
  };

  const handleDownload = (compressedImage: ImageInfo) => {
    const zip = new Blob();
    const zipUrl = URL.createObjectURL(zip);

    const zipLink = document.createElement("a");
    zipLink.href = zipUrl;
    zipLink.download = "compressed_images.zip";
    document.body.appendChild(zipLink);

    const imageUrl = URL.createObjectURL(compressedImage.file);
    zipLink.href = URL.createObjectURL(new Blob([zip, compressedImage.file]));
    zipLink.download = `${compressedImage.name}_compressed.jpg`;
    zipLink.click();
    URL.revokeObjectURL(imageUrl);

    document.body.removeChild(zipLink);
    URL.revokeObjectURL(zipUrl);
  };

  const handleDownloadAll = () => {
    compressedImageList.forEach((compressedImage) => {
      handleDownload(compressedImage);
    });
  };

  const compareImageSizesLabel = (originalFile: File, compressedFile: File) => {
    const { originalSize, compressedSize, percentReduction } =
      compareImageSizes(originalFile, compressedFile);

    return (
      <>
        From {originalSize} to {compressedSize}
        <br />
        Size reduced by {percentReduction}%
      </>
    );
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex flex-column align-items-center gap-3">
          <p className="mb-0">⬇️ {t("image-compressor.instructions")} ⬇️</p>
          {/* Drop picture(s) container */}
          <div className="image-compressor__upload-container bg-gradient rounded">
            <label htmlFor="file-input fs-1">
              {t("image-compressor.file-input-description")}
            </label>
            <input
              id="file-input"
              className="image-compressor__upload-container-input d-block opacity-0"
              key={inputFileValueKey}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
          </div>
          {/* Options */}
          <Button
            variant={optionsButtonVariant}
            onClick={(e) => handleOptionBoxStatus(e)}
          >
            {optionsButtonText}
          </Button>
          <Accordion
            className="image-compressor__accordion text-start"
            activeKey={activeKey}
          >
            <Accordion.Collapse eventKey="0">
              <Container>
                <Row className="gy-3">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label htmlFor="max-width">
                        {t("image-compressor.max-width")}
                      </Form.Label>
                      <Form.Control
                        id="max-width"
                        type="number"
                        value={maxWidth}
                        onChange={(e) => setMaxWidth(Number(e.target.value))}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label htmlFor="max-height">
                        {t("image-compressor.max-height")}
                      </Form.Label>
                      <Form.Control
                        id="max-height"
                        type="number"
                        value={maxHeight}
                        onChange={(e) => setMaxHeight(Number(e.target.value))}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label htmlFor="quality">
                        {t("image-compressor.quality")}
                      </Form.Label>
                      <InputGroup className="mb-1">
                        <Form.Control
                          id="quality-number"
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          value={quality}
                          onChange={(e) => setQuality(Number(e.target.value))}
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
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
            </Accordion.Collapse>
          </Accordion>
        </div>
      </div>
      {/* Result */}
      <div ref={compressedImagesContainerRef} className="col-12 my-4">
        {compressedImageList?.length ? (
          <>
            {compressedImageList.map((compressedImage) => (
              <div
                key={compressedImage.index}
                className="image-compressor__compressed-image-container bg-body-tertiary d-flex align-items-center border rounded mx-auto text-start mb-1 overflow-hidden"
              >
                <div className="image-compressor__compressed-image-miniature position-relative">
                  <ImageComponent
                    src={URL.createObjectURL(compressedImage.file)}
                    alt={compressedImage.name}
                    className="position-absolute h-100 w-100 object-fit-cover"
                  />
                </div>
                <div className="d-flex flex-column align-items-start justify-content-center flex-grow-1">
                  <p className="mx-3 mb-0">
                    <strong>{compressedImage.name}</strong>
                  </p>
                  <small className="mx-3 mt-1 mb-0 text-muted lh-sm">
                    {compareImageSizesLabel(
                      compressedImage.originalFile as File,
                      compressedImage.file as File
                    )}
                  </small>
                </div>
                <Button
                  onClick={() => handleDownload(compressedImage)}
                  className="me-2 text-nowrap"
                >
                  {t("image-compressor.download")}
                </Button>
              </div>
            ))}
          </>
        ) : null}
        {isLoading && (
          <Spinner animation="border" role="status" className="m-2">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {compressedImageList?.length ? (
          <div className="d-flex justify-content-center gap-3">
            <Button onClick={handleDownloadAll} className="mt-3">
              {t("image-compressor.download-all")} ({compressedImageList.length}
              )
            </Button>
            <Button variant="danger" onClick={() => {}} className="mt-3">
              Clear
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageCompressor;
