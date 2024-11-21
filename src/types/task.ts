export interface TaskData {
	id: string;
    text: string;
    label?: string;
    color?: TaskColors;
    isCompleted?: boolean;
    dueDate?: Date | undefined;
	completedAt?: Date;
}

export enum TaskColors {
	Gray = "gray",
	Red = "red",
	Yellow = 'yellow',
	Green = 'green',
	Blue = 'blue'
}