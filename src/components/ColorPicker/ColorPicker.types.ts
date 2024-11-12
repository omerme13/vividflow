import { TaskColors } from "@/components/Task";

interface BaseColorPickerProps {
    onClear?: () => void;
    className?: string;
}

interface SingleColorProps extends BaseColorPickerProps {
    isMulti: false;
    color: TaskColors | undefined;
    onChangeColor: (color: TaskColors | undefined) => void;
}

interface MultipleColorsProps extends BaseColorPickerProps {
    isMulti: true;
    colors: TaskColors[];
    onChangeColors: (colors: TaskColors[]) => void;
}

export type ColorPickerProps = SingleColorProps | MultipleColorsProps;