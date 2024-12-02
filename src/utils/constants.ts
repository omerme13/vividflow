import { LayoutState } from "@/types/layout";
import { PreferenceActivityCount, PreferenceDateFormat, PreferenceHourFormat, UserPreferences } from "@/types/preference";
import { CalendarPreference } from "./calendarLocalStorage";
import { CalendarViewMode } from "@/types/calendar";
import { Activity, TimeFilter } from "@/types/dashboard";

export enum StorageKeys {
    Preference = "vividflow_user_preferences",
    Tasks = "vividflow_tasks",
    Labels = "vividflow_labels",
    Layout = "vividflow_layout",
    CalendarPreference = "vividflow_calendar_preference",
	Activities = "vividflow_activities",
	DashboardTimeFilter = 'vividflow_dashbaord_time_filter'
}

export const DEFAULT_LAYOUT: LayoutState = {
	isCompactSidebar: false,
    isGridViewMode: true,
	isTaskModalOpen: false
} as const;

export const DEFAULT_CALENDAR_PREFERENCES: CalendarPreference = {
    currentView: CalendarViewMode.Month,
    filterCompleted: true,
    selectedLabels: [],
    workingHours: {
        start: 9,
        end: 17,
    },
} as const;

export const DEFAULT_ACTIVITIES: Activity[] = [] as const;

export const DEFAULT_PREFERENCES: UserPreferences = {
    isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    dateFormat: PreferenceDateFormat["DD/MM/YYYY"],
    hourFormat: PreferenceHourFormat["HH:mm"],
    username: "User",
    showCompletedEvents: true,
    recentActivitiesCount: PreferenceActivityCount.Regular,
} as const;

export const DEFAULT_DASHBOARD_TIME_FILTER: TimeFilter = TimeFilter.Month;
