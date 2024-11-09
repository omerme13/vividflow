import { StorageKeys, DEFAULT_CALENDAR_PREFERENCES } from "./constants";
import { View } from "react-big-calendar";

export interface CalendarPreference {
    currentView: View;
    filterCompleted: boolean;
    selectedLabels: string[];
    workingHours: {
        start: number;
        end: number;
    };
}

export const getCalendarPreference = (): CalendarPreference => {
    const storedPreferences = localStorage.getItem(StorageKeys.CalendarPreference);
    if (!storedPreferences) {
        localStorage.setItem(StorageKeys.CalendarPreference, JSON.stringify(DEFAULT_CALENDAR_PREFERENCES));
        return DEFAULT_CALENDAR_PREFERENCES;
    }

    try {
        return JSON.parse(storedPreferences);
    } catch {
        localStorage.removeItem(StorageKeys.CalendarPreference);
        return DEFAULT_CALENDAR_PREFERENCES;
    }
};

export const saveCalendarPreference = (preferences: Partial<CalendarPreference>): void => {
    const currentPreferences = getCalendarPreference();
    const updatedPreferences = {
        ...currentPreferences,
        ...preferences,
    };
    localStorage.setItem(StorageKeys.CalendarPreference, JSON.stringify(updatedPreferences));
};

export const getWorkingHours = () => {
    const preferences = getCalendarPreference();
    return preferences.workingHours;
};

export const saveWorkingHours = (start: number, end: number): void => {
    saveCalendarPreference({
        workingHours: { start, end },
    });
};

export const clearCalendarStorage = (): void => {
    localStorage.removeItem(StorageKeys.CalendarPreference);
};
