
export enum Page {
    Tasks = "tasks",
    Calendar = "calendar",
    Dashboard = "dashboard",
    Settings = "settings",
}

export interface LayoutState {
    isCompactSidebar: boolean;
    isGridViewMode: boolean;
	isTaskModalOpen: boolean;
}

export enum Breakpoint {
    s = "37.5em", // 600px
    m = "56.25em", // 900px
    l = "75em", // 1200px
    xl = "87.5em", // 1400px
}