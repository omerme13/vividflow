import { TaskData } from "./task";

export enum TimeFilter {
    Day = "day",
    Week = "week",
    Month = "month",
	All  = "all"
}

export interface DashboardChildProps {
    tasks: TaskData[];
    timeFilter: TimeFilter;
}

export enum ActivityType {
    Completed = "completed",
    Undone = "undone",
    Created = "created",
    Deleted = "deleted",
    DueDateSet = "dueDateSet",
    TextUpdated = "textUpdated",
    ColorChanged = "colorChanged",
    LabelChanged = "labelChanged",
    UndoDelete = "undoDelete",
}
export interface Activity {
    id: string;
    taskId: string;
    taskText: string;
    type: ActivityType;
    timestamp: string;
    dueDate?: string;
    color?: string;
    label?: string;
}
