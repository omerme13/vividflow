import { Breakpoint } from "@/types/layout";
import { useState, useEffect } from "react";

const createMediaQuery = (bp: Breakpoint) => window.matchMedia(`(max-width: ${bp})`);

export const useBreakpoint = (bp: Breakpoint): boolean => {
    const [isBelow, setIsBelow] = useState(false);

    useEffect(() => {
        const mediaQuery = createMediaQuery(bp);
        setIsBelow(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setIsBelow(e.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [bp]);

    return isBelow;
};
