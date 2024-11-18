import { DashboardIcon, CalendarIcon, SettingsIcon, TaskIcon } from "@/assets/icons";
import { Page } from "@/types/layout";

export { default as DEFAULT_AVATAR_URL } from "@/assets/icons/avatar.svg";

export const sidebarItems = [
    { page: Page.Tasks, icon: TaskIcon },
    { page: Page.Calendar, icon: CalendarIcon },
    { page: Page.Dashboard, icon: DashboardIcon },
    { page: Page.Settings, icon: SettingsIcon },
];
