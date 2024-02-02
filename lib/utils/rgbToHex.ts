export const rgbToHex = (rgb: string) => {
  const match = rgb.match(/\d+/g);

  if (!match) {
    return null;
  }

  return `#${match.map((x: string) => {
    let num = parseInt(x) - 50; // increase for darkness
    num = Math.max(num, 0);
    const hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
};