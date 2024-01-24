// Constants
import { Themes } from "@/constants/themes";

/**
 * Calculate the image color based on the provided theme and forceColor.
 *
 * @param {Themes} theme - The current theme.
 * @param {string} [forceColor] - The forced color for the image. If not provided, the theme color is used.
 * @returns {string} - The calculated image color.
 */
const getImageColor = (theme: Themes, forceColor?: string) => {
  if (forceColor) {
    return forceColor;
  }

  return theme === Themes.Dark ? "#fff" : "#000"; // Check bootstrap bs-emphasis-color value
};

export { getImageColor };
