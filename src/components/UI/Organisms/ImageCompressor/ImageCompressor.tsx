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
import DropFileInput from "@/components/UI/Molecules/DropFileInput/DropFileInput";

// Providers
import { useUsageCounter } from "@/components/providers/UsageCounterProvider";

// Locales
import { useTranslation } from "react-i18next";

// Typings
import { LanguageList } from "@/typings/i18next";

// Utils
import {
  calculateSize,
  compareImageSizes,
  getCanvasType,
} from "@/utils/image-compressor";
import { localizeDecimalSeparator } from "@/utils/conversions";
import { getCleanFileName } from "@/utils/strings";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";
import { ACCEPTED_IMAGE_FORMAT_LIST } from "@/constants/images";

type ImageInfo = {
  index: number;
  originalFile: File | Blob;
  file: Blob;
  name: string;
  downloaded: boolean;
  type: string;
};

enum ImageFormat {
  JPG = "jpg",
  PNG = "png",
  KEEP_FORMAT = "keep-format",
}

const DEFAULT_VALUES = {
  MAX_WIDTH: 0,
  MAX_HEIGHT: 0,
  QUALITY: 70,
  IMAGE_FORMAT: ImageFormat.JPG,
};

const ImageCompressor: React.FC = () => {
  const [inputFileValueKey, setInputFileValueKey] = useState<number>(0);
  const [maxWidth, setMaxWidth] = useState<number>(DEFAULT_VALUES.MAX_WIDTH);
  const [maxHeight, setMaxHeight] = useState<number>(DEFAULT_VALUES.MAX_HEIGHT);
  const [quality, setQuality] = useState<number>(DEFAULT_VALUES.QUALITY);
  const [imageFormat, setImageFormat] = useState<ImageFormat>(
    DEFAULT_VALUES.IMAGE_FORMAT
  );
  const [totalImages, setTotalImages] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [compressedImageList, setCompressedImageList] = useState<ImageInfo[]>(
    []
  );

  const compressedImagesContainerRef = useRef<HTMLDivElement>(null);

  const { updateUsageCounter } = useUsageCounter();

  const { i18n, t } = useTranslation("common");
  const { language } = i18n;

  useEffect(() => {
    if (loadedImages === totalImages) {
      setIsLoading(false);
      setTotalImages(0);
      setLoadedImages(0);
    }
  }, [loadedImages]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const files = e.target.files;
    if (e.target.files) {
      setInputFileValueKey((prevValue) => prevValue + 1); // Need this to trigger change event even if the user uploads files with the same names in different moments
    }

    if (files && files.length > 0) {
      setTotalImages(files.length);

      Array.from(files).forEach((file, index) => {
        processImage(file, index + compressedImageList.length);
      });

      // Scroll to compressed images section
      if (compressedImagesContainerRef.current) {
        compressedImagesContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
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

      const fileType =
        imageFormat === ImageFormat.KEEP_FORMAT &&
        ACCEPTED_IMAGE_FORMAT_LIST.includes(file.type)
          ? file.type
          : getCanvasType(imageFormat);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const imageInfo: ImageInfo = {
              index: index,
              originalFile: file,
              file: blob,
              name: getCleanFileName(file.name),
              downloaded: false,
              type: fileType,
            };
            setCompressedImageList((prevValue) => [...prevValue, imageInfo]);
          }
        },
        fileType,
        quality / 100
      );

      setLoadedImages((prevValue) => prevValue + 1);
    };
  };

  const handleDownload = async (compressedImage: ImageInfo) => {
    if (!compressedImage.file || !compressedImage.name) {
      console.error("Invalid compressedImage data");
      return;
    }

    try {
      const fileBlob = new Blob([compressedImage.file], {
        type:
          imageFormat === ImageFormat.KEEP_FORMAT &&
          ACCEPTED_IMAGE_FORMAT_LIST.includes(compressedImage.type)
            ? compressedImage.type
            : imageFormat,
      });
      const fileUrl = URL.createObjectURL(fileBlob);

      const downloadLink = document.createElement("a");
      downloadLink.href = fileUrl;
      const fileExtension =
        compressedImage.type === "image/png" ? "png" : "jpg";
      downloadLink.download = `${compressedImage.name}_compressed.${fileExtension}`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      URL.revokeObjectURL(fileUrl);

      if (!compressedImage.downloaded) {
        setCompressedImageList((currentImages) =>
          currentImages.map((image) =>
            image.index === compressedImage.index
              ? { ...image, downloaded: true }
              : image
          )
        );
      }

      updateUsageCounter();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
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
    <Row>
      <Col xs={12}>
        <div className="d-flex flex-column align-items-center gap-3">
          {/* Drop picture(s) container */}
          <DropFileInput
            key={inputFileValueKey}
            label={t("image-compressor.file-input-description")}
            isMultiple={true}
            handleImageChange={handleImageChange}
          />
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
                    <Col xs={12}>
                      <Form.Label htmlFor="quality">
                        {t("image-compressor.image-format")}
                      </Form.Label>
                      <Form.Group as={Col} className="d-flex flex-wrap">
                        <Form.Check
                          type="radio"
                          name="language"
                          id={`${CLASS_APP_NAME}-radio__jpg`}
                          className={`${CLASS_APP_NAME}-radio__theme me-3`}
                          label={"JPG"}
                          checked={imageFormat === ImageFormat.JPG}
                          onChange={() => setImageFormat(ImageFormat.JPG)}
                        />
                        <Form.Check
                          type="radio"
                          name="language"
                          id={`${CLASS_APP_NAME}-radio__png`}
                          className={`${CLASS_APP_NAME}-radio__theme me-3`}
                          label={"PNG"}
                          checked={imageFormat === ImageFormat.PNG}
                          onChange={() => setImageFormat(ImageFormat.PNG)}
                        />
                        <Form.Check
                          type="radio"
                          name="language"
                          id={`${CLASS_APP_NAME}-radio__keep-format`}
                          className={`${CLASS_APP_NAME}-radio__theme`}
                          label={t("image-compressor.keep-format")}
                          checked={imageFormat === ImageFormat.KEEP_FORMAT}
                          onChange={() =>
                            setImageFormat(ImageFormat.KEEP_FORMAT)
                          }
                        />
                        {imageFormat === ImageFormat.PNG && (
                          <p className="image-compressor__accordion-tip text-secondary w-100 mt-1 mb-0">
                            {t("image-compressor.format-tip")}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label htmlFor="max-width">
                          {t("image-compressor.max-width")}
                        </Form.Label>
                        <Form.Control
                          id="max-width"
                          type="number"
                          min="0"
                          step="1"
                          value={String(
                            maxWidth
                          )} /* Need this to prevent leading zeroes, hope it works correctly */
                          onChange={(e) => setMaxWidth(Number(e.target.value))}
                        />
                        <p className="image-compressor__accordion-tip text-secondary w-100 mt-1 mb-0">
                          {t("image-compressor.width-height-tip")}
                        </p>
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
                          min="0"
                          step="1"
                          value={String(
                            maxHeight
                          )} /* Need this to prevent leading zeroes, hope it works correctly */
                          onChange={(e) => setMaxHeight(Number(e.target.value))}
                        />
                        <p className="image-compressor__accordion-tip text-secondary w-100 mt-1 mb-0">
                          {t("image-compressor.width-height-tip")}
                        </p>
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
                            value={String(
                              quality
                            )} /* Need this to prevent leading zeroes, hope it works correctly */
                            onChange={(e) => setQuality(Number(e.target.value))}
                            aria-labelledby="quality"
                            className="image-compressor__quality-number me-1"
                          />
                          <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                        <Form.Range
                          id="quality"
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
      </Col>
      {/* Result */}
      <Col xs={12} ref={compressedImagesContainerRef} className="my-4">
        {compressedImageList?.length ? (
          <>
            {compressedImageList.map((compressedImage) => (
              <div
                key={compressedImage.index}
                className="image-compressor__compressed-image-container bg-body-tertiary d-flex align-items-center border border-hover rounded mx-auto text-start mb-1 overflow-hidden"
              >
                <div className="image-compressor__compressed-image-miniature position-relative">
                  <ImageComponent
                    src={URL.createObjectURL(compressedImage.file)}
                    alt={compressedImage.name}
                    className="position-absolute h-100 w-100 object-fit-cover"
                    draggable={false}
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
                    {t("image-compressor.download")}{" "}
                    {compressedImage.downloaded ? "👍" : ""}
                  </Button>
                </div>
              </div>
            ))}
          </>
        ) : null}
        {isLoading && (
          <Spinner animation="border" role="status" className="m-2">
            <span className="visually-hidden">{t("loading")}</span>
          </Spinner>
        )}
        {compressedImageList?.length ? (
          <>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button onClick={handleDownloadAll} className="position-relative">
                {t("image-compressor.download-all")}{" "}
                <span className="image-compressor__download-number rounded-circle pointer-events-none">
                  {compressedImageList.length}
                </span>
              </Button>
              <Button variant="danger" onClick={clearCompressedImageList}>
                {t("image-compressor.clear")}
              </Button>
            </div>
          </>
        ) : null}
      </Col>
    </Row>
  );
};

export default ImageCompressor;
