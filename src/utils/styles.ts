import { TaskColors } from "@/types/task";

export const getPaletteColor = (color: TaskColors) => `var(--color-${color})`;

export const getClassWithModifier = (className: string, modifierName: string, condition: boolean) =>
    `${className} ${condition ? `${className}--${modifierName}` : ""}`;
