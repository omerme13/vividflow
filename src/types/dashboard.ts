import { TaskData } from "./task";

export enum DashboardTimeFilter {
    Day = "day",
    Week = "week",
    Month = "month",
}

export interface DashboardChildProps {
	tasks: TaskData[];
	timeFilter: DashboardTimeFilter;
}