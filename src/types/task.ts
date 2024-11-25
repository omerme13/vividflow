export interface TaskData {
	id: string;
    text: string;
    label?: string;
    color?: TaskColors;
    dueDate?: string | undefined;
	completedAt?: string;
	createdAt: string;
}

export enum TaskColors {
	Gray = "gray",
	Red = "red",
	Yellow = 'yellow',
	Green = 'green',
	Blue = 'blue'
}