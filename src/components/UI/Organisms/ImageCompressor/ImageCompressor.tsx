import React, { ChangeEvent } from "react";

// Utils
import { readableBytes } from "@/utils/conversions";

interface ImageCompressorProps {
  quality: number;
}

interface ImageInfo {
  label: string;
  file: File | Blob;
}

const ImageUploader: React.FC<ImageCompressorProps> = ({ quality }) => {
  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;

    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        processImage(file);
      });
    }
  };

  const processImage = (file: File) => {
    const blobURL = URL.createObjectURL(file);
    const img = new Image();

    img.src = blobURL;
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      console.log("Cannot load image");
    };
    img.onload = () => {
      URL.revokeObjectURL(img.src);

      const [newWidth, newHeight] = calculateSize(img);

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          // Handle the compressed image. e.g., upload or save in local state
          if (blob) {
            const imageInfo: ImageInfo = {
              label: "Compressed file",
              file: blob,
            };
            displayInfo(imageInfo, file);
          }
        },
        "image/jpeg",
        quality
      );

      document.getElementById("img-container")?.append(canvas);
    };
  };

  const calculateSize = (img: HTMLImageElement) => {
    const width = img.width;
    const height = img.height;

    // Implement your logic to calculate new width and height based on maxWidth and maxHeight

    return [width, height];
  };

  // Utility functions for demo purpose

  const displayInfo = (imageInfo: ImageInfo, originalFile: File) => {
    const p = document.createElement("p");
    const sizeComparison = compareImageSizes(
      originalFile,
      imageInfo.file as File
    );
    p.innerText = `${imageInfo.label} - ${readableBytes(
      imageInfo.file.size
    )} (${sizeComparison})`;
    document.getElementById("img-container")?.append(p);
    createDownloadLink(imageInfo);
  };

  const createDownloadLink = (imageInfo: ImageInfo) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(imageInfo.file);
    downloadLink.download = `compressed_${new Date().toISOString()}.jpg`;
    downloadLink.innerText = "Download";
    document.getElementById("img-container")?.append(downloadLink);
    const lineBreak = document.createElement("br");
    document.getElementById("img-container")?.append(lineBreak);
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

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="d-flex"
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <p>Upload images and see the result</p>
          <input
            type="file"
            accept="image/*"
            style={{ display: "block" }}
            onChange={handleImageChange}
            multiple
          />
        </div>
      </div>
      <div id="img-container" className="col-12"></div>
    </div>
  );
};

export default ImageUploader;
