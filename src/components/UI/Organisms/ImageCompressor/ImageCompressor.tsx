import React, { useState, ChangeEvent, useRef } from "react";

// Components
import { Button, Image as ImageComponent } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";

// Utils
import {
  calculateSize,
  compareImageSizes,
  getCleanFileName,
} from "@/utils/ImageCompressor";

interface ImageInfo {
  index: number;
  originalFile: File | Blob;
  file: Blob;
  name: string;
  downloaded: boolean;
}

const ImageCompressor: React.FC = () => {
  const [inputFileValueKey, setInputFileValueKey] = useState<number>(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [quality, setQuality] = useState(70);
  const [compressedImageList, setCompressedImageList] = useState<ImageInfo[]>(
    []
  );

  const compressedImagesContainerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation("common");

  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (ev.target.files) {
      setInputFileValueKey((prevValue) => prevValue + 1);
    }

    if (files && files.length > 0) {
      Array.from(files).forEach((file, index) => {
        processImage(file, index + compressedImageList.length);
      });

      if (compressedImagesContainerRef.current) {
        // Scroll to compressed images section
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

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex flex-column align-items-center gap-3">
          <p>{t("image-compressor.instructions")}</p>
          <div>
            <input
              key={inputFileValueKey}
              type="file"
              accept="image/*"
              style={{ display: "block" }}
              onChange={handleImageChange}
              multiple
            />
          </div>
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <label htmlFor="max-width">
                {t("image-compressor.max-width")}
              </label>
              <input
                id="max-width"
                type="number"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                // TODO: add check on min value
              />
            </div>
            <div className="d-flex align-items-center gap-3">
              <label htmlFor="max-height">
                {t("image-compressor.max-height")}
              </label>
              <input
                id="max-height"
                type="number"
                value={maxHeight}
                onChange={(e) => setMaxHeight(Number(e.target.value))}
                // TODO: add check on min value
              />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="quality">
                {t("image-compressor.quality")} {quality}%
              </label>
              <input
                id="quality"
                type="range"
                min="0"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={compressedImagesContainerRef} className="col-12 my-4">
        {compressedImageList?.length ? (
          <>
            {compressedImageList.map((compressedImage) => (
              <div key={compressedImage.index}>
                <div
                  className="d-flex"
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <ImageComponent
                    src={URL.createObjectURL(compressedImage.file)}
                    rounded
                    alt={compressedImage.name}
                    height={200}
                  />
                  <p className="mx-3">{compressedImage.name}</p>

                  <Button onClick={() => handleDownload(compressedImage)}>
                    Download
                  </Button>
                </div>
                <p>
                  {compareImageSizes(
                    compressedImage.originalFile as File,
                    compressedImage.file as File
                  )}
                </p>
              </div>
            ))}
            <div className="d-flex justify-content-center">
              <Button onClick={handleDownloadAll}>Download All</Button>
            </div>
          </>
        ) : (
          <p>...</p>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
