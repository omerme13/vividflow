import { CheckIcon, DashboardIcon, CalendarIcon, SettingsIcon } from '@/assets/icons';

export enum SidebarActions {
	Tasks = "tasks",
	Dashboard = "dashboard",
	Calendar = "calendar",
	Settings = "settings",
}
export const sidebarItems = [
    { text: SidebarActions.Tasks, icon: CheckIcon },
    { text: SidebarActions.Dashboard, icon: DashboardIcon },
    { text: SidebarActions.Calendar, icon: CalendarIcon },
    { text: SidebarActions.Settings, icon: SettingsIcon },
];
