import { useEffect, useRef, useState } from "react";

export default function useDebouncedValue<T>(value: T, delay: number = 300) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timerRef.current);
    }, [value, delay]);

    return debouncedValue;
}
