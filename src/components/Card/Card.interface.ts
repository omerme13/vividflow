export interface CardProps {
	text: string;
	label?: string;
	color?: string;
	isOnKanban?: boolean;
	isCompleted?: boolean;
	dueDate?: Date;
}
