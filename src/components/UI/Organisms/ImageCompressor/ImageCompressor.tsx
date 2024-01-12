import React, { useState, ChangeEvent } from "react";
import { Image as ImageComponent } from "react-bootstrap";

// Utils
import { readableBytes } from "@/utils/conversions";

interface ImageInfo {
  index: number;
  originalFile: File | Blob;
  file: Blob;
  name: string;
  downloaded: boolean;
}

const ImageCompressor: React.FC = () => {
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [quality, setQuality] = useState(70);
  const [compressedImageList, setCompressedImageList] = useState<ImageInfo[]>(
    []
  );

  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;

    if (files && files.length > 0) {
      Array.from(files).forEach((file, index) => {
        processImage(file, index + compressedImageList.length);
      });
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

  const calculateSize = (
    img: HTMLImageElement,
    maxWidth: number,
    maxHeight: number
  ) => {
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (maxWidth && width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (maxHeight && height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }

    return [width, height];
  };

  const compareImageSizes = (original: File, compressed: File): string => {
    const originalSize = original.size;
    const compressedSize = compressed.size;
    const percentReduction =
      ((originalSize - compressedSize) / originalSize) * 100;
    return `${readableBytes(originalSize)} - ${readableBytes(
      compressedSize
    )} Reduced by ${percentReduction.toFixed(2)}%`;
  };

  function getCleanFileName(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf(".");

    if (lastDotIndex <= 0) {
      return fileName;
    }

    return fileName.substring(0, lastDotIndex);
  }

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="d-flex"
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <p>Upload images and see the result</p>
          <label htmlFor="max-width">Max width</label>
          <input
            id="max-width"
            type="number"
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            // TODO: add check on min value
          />
          <br />
          <label htmlFor="max-height">Max height</label>
          <input
            id="max-height"
            type="number"
            value={maxHeight}
            onChange={(e) => setMaxHeight(Number(e.target.value))}
            // TODO: add check on min value
          />
          <br />
          <label htmlFor="quality">Quality {quality}%</label>
          <input
            id="quality"
            type="range"
            min="0"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
          <br />
          <input
            type="file"
            accept="image/*"
            style={{ display: "block" }}
            onChange={handleImageChange}
            multiple
          />
        </div>
      </div>
      <div className="col-12 my-4">
        {compressedImageList?.length ? (
          compressedImageList.map((compressedImage) => (
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
                <p>
                  <a
                    href={URL.createObjectURL(compressedImage.file)}
                    download={`${compressedImage.name}_compressed.jpg`}
                  >
                    Download
                  </a>
                </p>
              </div>
              <p>
                {compareImageSizes(
                  compressedImage.originalFile as File,
                  compressedImage.file as File
                )}
              </p>
            </div>
          ))
        ) : (
          <p>Nothing</p>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
