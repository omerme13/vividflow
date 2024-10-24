import { TaskColors } from "@/components/Task";

export const getPaletteColor = (color: TaskColors) => `var(--color-palette-${color})`;