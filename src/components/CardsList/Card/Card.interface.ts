export interface CardData {
    text: string;
    label?: string;
    color?: CardColors;
    isOnKanban?: boolean;
    isCompleted?: boolean;
    dueDate?: Date | null;
}

export interface CardProps {
	card: CardData;
}

export enum CardColors {
    Red = "red",
    Orange = "orange",
	Yellow = 'yellow',
	Green = 'green',
	Blue = 'blue'
}
