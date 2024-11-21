import { TaskColors } from "@/types/task";

export enum TimeFilter {
    Day = "day",
    Week = "week",
    Month = "month",
}

export interface StatBoxProps {
	label: string;
	value: number;
	color: TaskColors;
}