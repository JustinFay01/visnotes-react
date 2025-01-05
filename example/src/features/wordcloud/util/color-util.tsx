/**
 * Determines the appropriate text color (black or white) based on the luminance of the given hex color.
 *
 * @param {string} hexColor - The hex color code (e.g., "#FFFFFF").
 * @returns {string} - Returns "black" if the luminance is greater than 0.5, otherwise returns "white".
 * @link https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
 */
export function getTextColor(hexColor: string): string {
  // Convert hex to RGB
  // Remove the hash
  hexColor = hexColor.replace("#", "");
  // Pad with 0's if we get a 5 character hex
  hexColor = hexColor.length === 5 ? hexColor + "0" : hexColor;

  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r) / 255 + (0.587 * g) / 255 + (0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white";
}
