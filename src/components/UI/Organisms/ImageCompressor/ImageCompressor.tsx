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
} from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";

// Typings
import { LanguageList } from "@/typings/i18next";

// Utils
import {
  calculateSize,
  compareImageSizes,
  getCleanFileName,
} from "@/utils/image-compressor";
import { localizeDecimalSeparator } from "@/utils/conversions";

interface ImageInfo {
  index: number;
  originalFile: File | Blob;
  file: Blob;
  name: string;
  downloaded: boolean;
}

const DEFAULT_VALUES = {
  MAX_WIDTH: 0,
  MAX_HEIGHT: 0,
  QUALITY: 70,
};

const ImageCompressor: React.FC = () => {
  const [inputFileValueKey, setInputFileValueKey] = useState<number>(0);
  const [maxWidth, setMaxWidth] = useState<number>(DEFAULT_VALUES.MAX_WIDTH);
  const [maxHeight, setMaxHeight] = useState<number>(DEFAULT_VALUES.MAX_HEIGHT);
  const [quality, setQuality] = useState<number>(DEFAULT_VALUES.QUALITY);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [compressedImageList, setCompressedImageList] = useState<ImageInfo[]>(
    []
  );

  const compressedImagesContainerRef = useRef<HTMLDivElement>(null);

  const { i18n, t } = useTranslation("common");
  const { language } = i18n;

  useEffect(() => {
    if (loadedImages === totalImages) {
      setIsLoading(false);
      setTotalImages(0);
      setLoadedImages(0);
    }
  }, [loadedImages]);

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

    const localizedOriginalSize = localizeDecimalSeparator(
      originalSize,
      language as LanguageList
    );
    const localizedCompressedSize = localizeDecimalSeparator(
      compressedSize,
      language as LanguageList
    );
    const localizedPercentReduction = localizeDecimalSeparator(
      percentReduction,
      language as LanguageList
    );

    if (originalFile.size > compressedFile.size) {
      return (
        <>
          {t("image-compressor.from-to", {
            localizedOriginalSize,
            localizedCompressedSize,
          })}
          <br />
          {t("image-compressor.size-reduction", { localizedPercentReduction })}
        </>
      );
    } else {
      return (
        <>
          {t("image-compressor.not-compressed")}
          <br />
          {t("image-compressor.not-compressed-size", {
            localizedCompressedSize,
          })}
        </>
      );
    }
  };

  const clearCompressedImageList = () => {
    setCompressedImageList([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex flex-column align-items-center gap-3">
          {/* Drop picture(s) container */}
          <div className="image-compressor__upload-container bg-gradient rounded">
            <label htmlFor="file-input" className="fs-3">
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
          <Accordion className="image-compressor__accordion w-100 text-start">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {t("image-compressor.options")}
              </Accordion.Header>
              <Accordion.Body className="px-0">
                {/* TODO: add description on how options values work */}
                <Container>
                  <Row className="g-3">
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
              </Accordion.Body>
            </Accordion.Item>
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
                <div className="d-flex flex-column flex-sm-row flex-grow-1 align-items-center w-100">
                  <div className="d-flex flex-column align-items-start justify-content-center flex-grow-1 w-100">
                    <p className="mx-3 mt-2 mt-sm-0 mb-0">
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
                    className="m-2 ms-3 me-auto m-sm-2 text-nowrap"
                  >
                    {t("image-compressor.download")}
                  </Button>
                </div>
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
          <>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button onClick={handleDownloadAll} className="position-relative">
                {t("image-compressor.download-all")}{" "}
                <span className="image-compressor__download-number">
                  {compressedImageList.length}
                </span>
              </Button>
              <Button variant="danger" onClick={clearCompressedImageList}>
                {/* TODO: Make it clear/reset the page */}
                {t("image-compressor.clear")}
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ImageCompressor;
