import { TaskColors } from "@/types/task";

export enum TimeFilter {
    Day = "day",
    Week = "week",
    Month = "month",
}

export interface StatProps {
    color?: TaskColors;
    value: number | string;
    label: string;
}