import { useEffect, useRef } from 'react';
import { Gradient } from "../utils/Gradient.js";

export const useGradient = (canvasId: string, colors: string[]) => {
    const gradientRef = useRef<any>(null);
    const colorsRef = useRef<string[]>([]);

    const arraysEqual = (a: string[], b: string[]) => {
        return a.length === b.length && a.every((val, index) => val === b[index]);
    };

    useEffect(() => {
        if (!gradientRef.current) {
            gradientRef.current = new Gradient();
        }

        const canvasElement = document.getElementById(canvasId);
        if (canvasElement && !arraysEqual(colorsRef.current, colors)) {
            colorsRef.current = colors;
            gradientRef.current.initGradient(`#${canvasId}`);
        }
    }, [canvasId, colors]);
};
