import { useEffect, useRef } from "react";

import { TaskColors } from "@/components/Task";

import "./ColorPalette.scss";
import { getPaletteColor } from "@/utils/styles";
interface ColorPaletteProps {
    updateTaskColor: (newColor: TaskColors) => void;
    onClose: () => void;
}

export default function ColorPalette({ updateTaskColor, onClose }: ColorPaletteProps) {
    const paletteRef = useRef<HTMLDivElement>(null);

    const setColor = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;

        if (target?.dataset?.color) {
            updateTaskColor(target.dataset.color as TaskColors);
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
            {Object.values(TaskColors).map((color: TaskColors) => (
                <div
                    key={color}
                    className={`color-palette__color color-palette__color--${color}`}
                    onClick={setColor}
                    data-color={color}
					style={{ background: getPaletteColor(color) }}
                />
            ))}
        </div>
    );
}
