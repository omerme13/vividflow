import { TaskColors } from "@/components/Task";

export const getPaletteColor = (color: TaskColors | undefined) => `var(--color-palette-${color}, var(--color-light-gray))`;