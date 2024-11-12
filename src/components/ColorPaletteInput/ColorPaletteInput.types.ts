import { TaskColors } from "@/components/Task";

interface BaseColorPaletteInputProps {
    onClear?: () => void;
    className?: string;
}

interface SingleColorProps extends BaseColorPaletteInputProps {
    isMulti: false;
    color: TaskColors | undefined;
    onChangeColor: (color: TaskColors | undefined) => void;
}

interface MultipleColorsProps extends BaseColorPaletteInputProps {
    isMulti: true;
    colors: TaskColors[];
    onChangeColors: (colors: TaskColors[]) => void;
}

export type ColorPaletteInputProps = SingleColorProps | MultipleColorsProps;