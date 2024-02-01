import ColorThief from "colorthief";

type ColorPalette = string[] | null;

export const getColors = async (imageUrl: string): Promise<ColorPalette> => {
    return new Promise((resolve, reject) => {
        if (!imageUrl) {
            reject("Image URL is missing");
            return;
        }

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;

        img.onload = () => {
            try {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(img, 4);
                if (palette) {
                    const colorStrings = palette.map(color => `rgb(${color.join(", ")})`);
                    resolve(colorStrings);
                } else {
                    reject("Failed to extract colors, palette is null");
                }
            } catch (error) {
                reject(`Error extracting colors: ${error}`);
            }
        };

        img.onerror = (error) => {
            reject(`Error loading image: ${error}`);
        };
    });
};
