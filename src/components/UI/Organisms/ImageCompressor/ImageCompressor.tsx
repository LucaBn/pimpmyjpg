import React, { useRef, useState } from "react";

// Utils
import { readableBytes } from "@/utils/conversions";

const ImageCompressor: React.FC = () => {
  const [compressedBlobs, setCompressedBlobs] = useState<Blob[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);

  const calculateSize = (
    img: HTMLImageElement,
    maxWidth?: number,
    maxHeight?: number
  ): [number, number] => {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const newCompressedBlobs: Blob[] = [];

      Array.from(files).forEach((file) => {
        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;

        img.onload = () => {
          const [newWidth, newHeight] = calculateSize(
            img
            // MAX_WIDTH,
            // MAX_HEIGHT
          );
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            canvas.toBlob((blob) => {
              if (blob) {
                newCompressedBlobs.push(blob);
                setCompressedBlobs([...newCompressedBlobs]);

                const displayTag = document.createElement("p");
                displayTag.innerText = `Original Image - ${readableBytes(
                  file.size
                )} :::::: Compressed Image - ${readableBytes(blob.size)}`;
                document.getElementById("container")?.appendChild(displayTag);
              }
            });
          }
        };
      });
    }
  };

  const handleDownloadClick = () => {
    if (compressedBlobs.length > 0) {
      compressedBlobs.forEach((blob, index) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `compressed_image_${index}.jpg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    } else {
      alert("Compress at least one image before downloading.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleInputChange} ref={inputRef} multiple />
      <button onClick={handleDownloadClick} ref={downloadButtonRef}>
        Download
      </button>
      <div id="container"></div>
    </div>
  );
};

export default ImageCompressor;
