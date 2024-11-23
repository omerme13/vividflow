import { useEffect, RefObject } from "react";

interface UseClickOutsideProps {
    refs: RefObject<HTMLElement>[];
    handler: () => void;
    enabled?: boolean;
}

export default function useClickOutside({ refs, handler, enabled = true }: UseClickOutsideProps): void {
    useEffect(() => {
        if (!enabled) return;

        const handleClickOutside = (e: MouseEvent) => {
            const path = e.composedPath();
            
            const clickedInside = refs.some(ref => 
                ref.current && path.includes(ref.current)
            );

            if (!clickedInside) handler();
        };
		
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [refs, handler, enabled]);
}
