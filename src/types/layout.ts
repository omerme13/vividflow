export enum CalendarMode {
    Day = "day",
    Week = "week",
    Month = "month",
    Year = "year",
}

export enum Page {
    Tasks = "tasks",
    Dashboard = "dashboard",
    Calendar = "calendar",
    Settings = "settings",
}

export interface LayoutState {
    isCompactSidebar: boolean;
    isGridViewMode: boolean;
    calendarMode: CalendarMode;
	isTaskModalOpen: boolean;
}
