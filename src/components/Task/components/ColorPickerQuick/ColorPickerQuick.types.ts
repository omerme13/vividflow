import { TaskColors } from "@/components/Task";

export interface ColorPickerQuickProps {
    updateTaskColor: (newColor: TaskColors) => void;
    onClose: () => void;
}