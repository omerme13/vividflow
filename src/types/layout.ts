
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
