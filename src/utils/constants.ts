import { CalendarMode, LayoutState } from "@/types/layout";
import { UserPreferences } from "@/types/preference";

export enum StorageKeys {
    Preference = "vividflow_user_preferences",
    Tasks = "vividflow_tasks",
    Labels = "vividflow_labels",
    Layout = "vividflow_layout",
    CalendarPreference = "vividflow_calendar_preference",
    CalendarView = "vividflow_calendar_view",
}

export const DEFAULT_PREFERENCES: UserPreferences = {
    isDarkMode: false,
} as const;

export const DEFAULT_LAYOUT: LayoutState = {
	isCompactSidebar: false,
    isGridViewMode: true,
    calendarMode: CalendarMode.Month,
	isTaskModalOpen: false
} as const;