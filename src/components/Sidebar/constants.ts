import { CheckIcon, DashboardIcon, CalendarIcon, SettingsIcon } from '@/assets/icons';
import { Page } from '@/types/layout';

export const sidebarItems = [
    { text: Page.Tasks, icon: CheckIcon },
    { text: Page.Dashboard, icon: DashboardIcon },
    { text: Page.Calendar, icon: CalendarIcon },
    { text: Page.Settings, icon: SettingsIcon },
];
