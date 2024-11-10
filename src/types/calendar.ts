import { TaskData } from "@/components/Task";
import { Event } from "react-big-calendar";

export enum CalendarViewMode {
    Day = "day",
    Week = "week",
    Month = "month",
    Agenda = "agenda",
}

export interface CalendarEvent extends Event {
	task: TaskData;
}