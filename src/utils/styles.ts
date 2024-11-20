import { TaskColors } from "@/components/Task";

export const getPaletteColor = (color: TaskColors) => `var(--color-${color})`;

export const getClassWithModifier = (className: string, modifierName: string, condition: boolean) =>
    `${className} ${condition ? `${className}--${modifierName}` : ""}`;
