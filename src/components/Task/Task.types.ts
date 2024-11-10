export interface TaskData {
	id: string;
    text: string;
    label?: string;
    color?: TaskColors;
    isOnKanban?: boolean;
    isCompleted?: boolean;
    dueDate?: Date | undefined;
	completedAt?: Date;
}

export interface TaskProps {
	task: TaskData;
	onEdit: () => void;
	isGridMode?: boolean;
}

export enum TaskColors {
	Gray = "gray",
    Red = "red",
	Yellow = 'yellow',
	Green = 'green',
	Blue = 'blue'
}
