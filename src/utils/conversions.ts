/**
 * Converts a given number of bytes into a human-readable format with appropriate unit (B, KB, MB, GB, TB, PB, EB, ZB, YB).
 *
 * @param {number} bytes - The number of bytes to be converted.
 * @returns {string} A string representing the human-readable format of the input bytes.
 */
const readableBytes = (bytes: number): string => {
  // Calculate the appropriate unit (B, KB, MB, etc.) based on the logarithm to the base 1024.
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  // Define the unit sizes in an array.
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  // Calculate the converted value and append the corresponding unit.
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
};

export { readableBytes };
