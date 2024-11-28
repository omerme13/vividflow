import { Event } from "react-big-calendar";
import { TaskData } from "./task";
import { CSSProperties } from "react";

export enum CalendarViewMode {
    Day = "day",
    Week = "week",
    Month = "month",
    Agenda = "agenda",
}

export interface CalendarEvent extends Event {
	task: TaskData;
	style: CSSProperties;
}