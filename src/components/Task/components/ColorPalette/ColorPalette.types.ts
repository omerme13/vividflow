import { TaskColors } from "@/components/Task";

export interface ColorPaletteProps {
    updateTaskColor: (newColor: TaskColors) => void;
    onClose: () => void;
}