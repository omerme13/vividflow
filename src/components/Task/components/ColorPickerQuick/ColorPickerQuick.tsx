import { MouseEvent } from "react";
import { getPaletteColor } from "@/utils/styles";
import { ColorPickerQuickProps } from "./ColorPickerQuick.types";
import { TaskColors } from "@/types/task";

import "./ColorPickerQuick.scss";

export default function ColorPickerQuick({ updateTaskColor }: ColorPickerQuickProps) {

    const setColor = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;

        if (target?.dataset?.color) {
            updateTaskColor(target.dataset.color as TaskColors);
        }
    };

    return (
        <div className="color-picker-quick">
            {Object.values(TaskColors).map((color: TaskColors) => (
                <div
                    key={color}
                    className={`color-picker-quick__color color-picker-quick__color--${color}`}
                    onClick={setColor}
                    data-color={color}
					style={{ background: getPaletteColor(color) }}
                />
            ))}
        </div>
    );
}
