import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { CardColors } from "./Card.types";

import "./ColorPalette.scss";
interface ColorPaletteProps {
    setCardColor: Dispatch<SetStateAction<CardColors | undefined>>;
    onClose: () => void;
}

export default function ColorPalette({ setCardColor, onClose }: ColorPaletteProps) {
    const paletteRef = useRef<HTMLDivElement>(null);

    const setColor = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;

        if (target?.dataset?.color) {
            setCardColor(target.dataset.color as CardColors);
            onClose();
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="color-palette" ref={paletteRef}>
            {Object.values(CardColors).map((color: CardColors) => (
                <div
                    key={color}
                    className={`color-palette__color color-palette__color--${color}`}
                    onClick={setColor}
                    data-color={color}
                />
            ))}
        </div>
    );
}
