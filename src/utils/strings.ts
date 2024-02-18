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

export { getCleanFileName };
