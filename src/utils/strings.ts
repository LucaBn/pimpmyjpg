/**
 * Get a clean version of the file name by removing the file extension.
 *
 * @param {string} fileName - The original file name.
 * @returns {string} - The clean file name without the extension.
 */
const getCleanFileName = (fileName: string): string => {
  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex <= 0) {
    return fileName;
  }

  return fileName.substring(0, lastDotIndex);
};

/**
 * Checks if the given string is a valid URL.
 *
 * @param {string} url - The string to be checked.
 * @returns {boolean} - Returns `true` if the string is a valid URL, otherwise `false`.
 */
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export { getCleanFileName, isValidUrl };
