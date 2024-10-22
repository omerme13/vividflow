export interface CardData {
	id: string;
    text: string;
    label?: string;
    color?: CardColors;
    isOnKanban?: boolean;
    isCompleted?: boolean;
    dueDate?: Date | null;
}

export interface CardProps {
	card: CardData;
	deleteCard: (id: string) => void;
}

export enum CardColors {
    Red = "red",
    Orange = "orange",
	Yellow = 'yellow',
	Green = 'green',
	Blue = 'blue'
}
