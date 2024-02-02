export const updateGradient = (colors: string[]) => {
    const root = document.documentElement;
    const maxColorVariables = 4;

    const currentColors = Array.from({ length: maxColorVariables }, (_, i) =>
        root.style.getPropertyValue(`--gradient-color-${i + 1}`).trim()
    );

    const arraysEqual = (a: string[], b: string[]) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    if (!arraysEqual(colors, currentColors)) {
        for (let i = 1; i <= maxColorVariables; i++) {
            root.style.removeProperty(`--gradient-color-${i}`);
        }

        colors.forEach((color, index) => {
            root.style.setProperty(`--gradient-color-${index + 1}`, color);
        });
    }
};
