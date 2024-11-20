import { TaskColors } from "@/types/task";

export interface ColorPickerQuickProps {
    updateTaskColor: (newColor: TaskColors) => void;
    onClose: () => void;
}