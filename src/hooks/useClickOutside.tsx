import { useEffect, RefObject } from "react";

interface UseClickOutsideProps {
    refs: RefObject<HTMLElement>[];
    handler: () => void;
    enabled?: boolean;
}

export default function useClickOutside({ refs, handler, enabled = true }: UseClickOutsideProps): void {
    useEffect(() => {
        if (!enabled) return;

        const handleClickOutside = (event: MouseEvent) => {
            const clickedOutside = refs.every((ref) => !ref.current?.contains(event.target as Node));

            if (clickedOutside) {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [refs, handler, enabled]);
}
