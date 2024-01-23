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

/**
 * Compare the sizes of two image files and calculate the reduction percentage.
 *
 * @param {File} original - The original image file.
 * @param {File} compressed - The compressed image file.
 * @returns {string} - A string indicating the reduction in size.
 */
const compareImageSizes = (original: File, compressed: File): string => {
  const originalSize = original.size;
  const compressedSize = compressed.size;
  const percentReduction =
    ((originalSize - compressedSize) / originalSize) * 100;
  return `${readableBytes(originalSize)} - ${readableBytes(
    compressedSize
  )} Reduced by ${percentReduction.toFixed(2)}%`;
  // TODO: return only sizes without text
  // TODO: break line so that "Reduced by..." is on a new line
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
