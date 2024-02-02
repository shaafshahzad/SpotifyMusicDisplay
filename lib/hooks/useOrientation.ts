import { useState, useEffect } from 'react';

export const useOrientation = () => {
    const [orientation, setOrientation] = useState("portrait");

    useEffect(() => {
        const checkOrientation = () => {
            if (window.innerWidth > window.innerHeight) {
                setOrientation("landscape");
            } else {
                setOrientation("portrait");
            }
        };

        checkOrientation();
        window.addEventListener("resize", checkOrientation);

        return () => window.removeEventListener("resize", checkOrientation);
    }, []);

    return orientation;
};
