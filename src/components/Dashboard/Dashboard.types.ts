import { TaskColors } from "@/types/task";
export interface StatProps {
    color?: TaskColors;
    value: number | string;
    label: string;
}