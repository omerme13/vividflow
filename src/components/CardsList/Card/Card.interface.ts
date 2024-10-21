export interface ICard {
    text: string;
    label?: string;
    color?: CardColors;
    isOnKanban?: boolean;
    isCompleted?: boolean;
    dueDate?: Date | null;
}

export interface CardProps {
	card: ICard;
}

export enum CardColors {
    Red = "red",
    Orange = "orange",
	Yellow = 'yellow',
	Green = 'green',
	Blue = 'blue'
}
