/**
 * Blends two colors using the overlay blend mode.
 * The function first converts the base and blend color values from a 0-255 range to a 0-1 range,
 * applies the overlay blending formula, and then converts the result back to a 0-255 range.
 * In the overlay blend mode, multiplies or screens the colors, depending on the base color.
 *
 * @param {number} base - The base color value in the range 0-255.
 * @param {number} blend - The blend color value in the range 0-255.
 * @returns {number} The result of the overlay blend in the range 0-255, rounded to the nearest integer.
 */
const overlayBlend = (base: number, blend: number) => {
  base /= 255;
  blend /= 255;
  return Math.round(
    255 * (base <= 0.5 ? 2 * base * blend : 1 - 2 * (1 - base) * (1 - blend))
  );
};

export { overlayBlend };
