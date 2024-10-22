import CheckIcon from "@/assets/icons/check.svg?react";
import DashboardIcon from "@/assets/icons/dashboard.svg?react";
import CalendarIcon from "@/assets/icons/calendar.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";

export enum SidebarActions {
	tasks = "tasks",
	dashboard = "dashboard",
	calendar = "calendar",
	settings = "settings",
}
export const sidebarItems = [
    { text: SidebarActions.tasks, icon: CheckIcon },
    { text: SidebarActions.dashboard, icon: DashboardIcon },
    { text: SidebarActions.calendar, icon: CalendarIcon },
    { text: SidebarActions.settings, icon: SettingsIcon },
];
