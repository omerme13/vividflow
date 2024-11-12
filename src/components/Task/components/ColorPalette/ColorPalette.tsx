import { MouseEvent } from "react";
import { TaskColors } from "@/components/Task";
import { ColorPaletteProps } from "./ColorPalette.types";
import { getPaletteColor } from "@/utils/styles";

import "./ColorPalette.scss";

export default function ColorPalette({ updateTaskColor }: ColorPaletteProps) {

    const setColor = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;

        if (target?.dataset?.color) {
            updateTaskColor(target.dataset.color as TaskColors);
        }
    };

    return (
        <div className="color-palette">
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
