import { CardColors } from "@/components/CardsList/components/Card";

export const getPaletteColor = (color: CardColors | undefined) => `var(--color-palette-${color}, var(--color-light-gray))`;