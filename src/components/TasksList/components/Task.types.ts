export interface TaskData {
	id: string;
    text: string;
    label?: string;
    color?: TaskColors;
    isOnKanban?: boolean;
    isCompleted?: boolean;
    dueDate?: Date | null;
}

export interface TaskProps {
	task: TaskData;
	deleteTask: (id: string) => void;
}

export enum TaskColors {
    Red = "red",
    Orange = "orange",
	Yellow = 'yellow',
	Green = 'green',
	Blue = 'blue'
}
