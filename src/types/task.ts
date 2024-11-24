export interface TaskData {
	id: string;
    text: string;
    label?: string;
    color?: TaskColors;
    isCompleted?: boolean;
    dueDate?: string | undefined;
	completedAt?: string;
}

export enum TaskColors {
	Gray = "gray",
	Red = "red",
	Yellow = 'yellow',
	Green = 'green',
	Blue = 'blue'
}