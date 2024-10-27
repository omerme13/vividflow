import { CheckIcon, DashboardIcon, CalendarIcon, SettingsIcon } from '@/assets/icons';

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
