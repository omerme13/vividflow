import { TaskColors } from "@/components/Task";
import { getClassWithModifier, getPaletteColor } from "@/utils/styles";
import { ColorPickerProps } from "./ColorPicker.types";

import "./ColorPicker.scss";

export default function ColorPicker({
    isMulti,
    color,
    colors,
    onChangeColor,
    onChangeColors,
    onClear,
    className = "",
}: ColorPickerProps) {
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
        <div className={`color-picker ${className}`}>
            <div className="color-picker__colors">
                {Object.values(TaskColors).map((colorOption: TaskColors) => (
                    <div key={colorOption} className="color-picker__color-item">
                        <input
                            type={isMulti ? "checkbox" : "radio"}
                            id={`color-${colorOption}`}
                            name="color-selection"
                            className="color-picker__color-input"
                            checked={isSelected(colorOption)}
                            onChange={() => handleColorChange(colorOption)}
                        />
                        <label
                            htmlFor={`color-${colorOption}`}
                            className={getClassWithModifier(
                                "color-picker__color-label",
                                "selected",
                                isSelected(colorOption)
                            )}
                            style={{ backgroundColor: getPaletteColor(colorOption) }}
                        />
                    </div>
                ))}
                {onClear && (
                    <button className="color-picker__clear-button" type="button" onClick={onClear}>
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
