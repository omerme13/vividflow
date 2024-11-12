import { TaskColors } from "@/components/Task";
import { getClassWithModifier, getPaletteColor } from "@/utils/styles";
import { ColorPaletteInputProps } from "./ColorPaletteInput.types";

import "./ColorPaletteInput.scss";

export default function ColorPaletteInput({
    isMulti,
    color,
    colors,
    onChangeColor,
    onChangeColors,
    onClear,
    className = "",
}: ColorPaletteInputProps) {
    const handleColorChange = (selectedColor: TaskColors) => {
        if (isMulti) {
            onChangeColors(
                colors.includes(selectedColor) ? colors.filter((c) => c !== selectedColor) : [...colors, selectedColor]
            );
        } else {
            onChangeColor(color === selectedColor ? undefined : selectedColor);
        }
    };

    const isSelected = (colorToCheck: TaskColors): boolean => {
        return isMulti ? colors.includes(colorToCheck) : color === colorToCheck;
    };

    return (
        <div className={`color-palette-input ${className}`}>
            <div className="color-palette-input__colors">
                {Object.values(TaskColors).map((colorOption: TaskColors) => (
                    <div key={colorOption} className="color-palette-input__color-item">
                        <input
                            type={isMulti ? "checkbox" : "radio"}
                            id={`color-${colorOption}`}
                            name="color-selection"
                            className="color-palette-input__color-input"
                            checked={isSelected(colorOption)}
                            onChange={() => handleColorChange(colorOption)}
                        />
                        <label
                            htmlFor={`color-${colorOption}`}
                            className={getClassWithModifier(
                                "color-palette-input__color-label",
                                "selected",
                                isSelected(colorOption)
                            )}
                            style={{ backgroundColor: getPaletteColor(colorOption) }}
                        />
                    </div>
                ))}
                {onClear && (
                    <button className="color-palette-input__clear-button" type="button" onClick={onClear}>
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
