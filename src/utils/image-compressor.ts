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

/**
 * Get a clean version of the file name by removing the file extension.
 *
 * @param {string} fileName - The original file name.
 * @returns {string} - The clean file name without the extension.
 */
function getCleanFileName(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex <= 0) {
    return fileName;
  }

  return fileName.substring(0, lastDotIndex);
}

export { calculateSize, compareImageSizes, getCleanFileName };
