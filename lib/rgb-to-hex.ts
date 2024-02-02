export const rgbToHex = (rgb: string) => {
  // Match the numbers in the rgb() string (e.g., "rgb(174, 95, 54)")
  const match = rgb.match(/\d+/g);

  if (!match) {
    return null; // or a default hex color if you prefer
  }

  // Convert each component to a hexadecimal string
  return `#${match.map((x: string) => {
    let num = parseInt(x) - 20; // Subtract 20 to darken the color
    num = Math.max(num, 0); // Ensure the number is not less than 0
    const hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex; // Pad with zero if necessary
  }).join('')}`;
};