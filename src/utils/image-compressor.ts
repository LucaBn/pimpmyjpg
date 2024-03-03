import { readableBytes } from "@/utils/conversions";

/**
 * Calculate the new dimensions of an image based on the given constraints.
 *
 * @param {HTMLImageElement} img - The image element.
 * @param {number} maxWidth - The maximum width constraint.
 * @param {number} maxHeight - The maximum height constraint.
 * @returns {number[]} - An array containing the new width and height.
 */
const calculateSize = (
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
): number[] => {
  let width = img.width;
  let height = img.height;

  const reduceByWidth = () => {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  };

  const reduceByHeight = () => {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  };

  if (maxWidth && !maxHeight) {
    reduceByWidth();
  } else if (!maxWidth && maxHeight) {
    reduceByHeight();
  } else if (maxWidth && maxHeight) {
    if (width / height < maxWidth / maxHeight) {
      reduceByHeight();
    } else {
      reduceByWidth();
    }
  }

  return [width, height];
};

type CompareImageSizeInfo = {
  originalSize: string;
  compressedSize: string;
  percentReduction: string;
};

/**
 * Compare the sizes of two image files and calculate the reduction percentage.
 *
 * @param {File} original - The original image file.
 * @param {File} compressed - The compressed image file.
 * @returns {CompareImageSizeInfo} - An object with info about originalSize, compressedSize and percentReduction.
 */
const compareImageSizes = (
  original: File,
  compressed: File
): CompareImageSizeInfo => {
  const originalSize = readableBytes(original.size);
  const compressedSize = readableBytes(compressed.size);
  const percentReduction = (
    ((original.size - compressed.size) / original.size) *
    100
  ).toFixed(2);

  return {
    originalSize,
    compressedSize,
    percentReduction,
  };
};

// Monitor support for image/webp https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL#browser_compatibility
enum CanvasImageFormat {
  jpg = "jpeg",
  png = "png",
}

/**
 * Determines the MIME type for a given image format for use with the HTML canvas element.
 * This function can accept both predefined formats from the CanvasImageFormat enum
 * (e.g., 'jpeg', 'png') or any generic image format string (e.g., 'gif').
 * For predefined formats, it returns the format prefixed with 'image/' (e.g., 'image/jpeg').
 * For generic string inputs, it assumes the string is a valid image format,
 * converts it to lowercase, and prefixes it with 'image/'.
 *
 * @param {CanvasImageFormat | string} imageFormat - The image format which can be
 * a value from the CanvasImageFormat enum or a generic string representing an image format.
 * @returns {string} The MIME type of the image format suitable for use with <canvas> elements.
 */
const getCanvasType = (imageFormat: CanvasImageFormat | string) => {
  if (
    Object.values(CanvasImageFormat).includes(imageFormat as CanvasImageFormat)
  ) {
    return `image/${imageFormat}`;
  } else {
    return `image/jpeg`;
  }
};

export { calculateSize, compareImageSizes, getCanvasType };
