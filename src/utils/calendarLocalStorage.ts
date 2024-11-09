import { StorageKeys } from "./constants";

interface CalendarPreference {
    currentView: "month" | "week" | "day" | "agenda";
    filterCompleted: boolean;
    selectedLabels: string[];
    workingHours: {
        start: number;
        end: number;
    };
}

interface CalendarView {
    selectedDate: string;
    filterCompleted: boolean;
    selectedLabels: string[];
}

const DEFAULT_PREFERENCES: CalendarPreference = {
    currentView: "month",
    filterCompleted: true,
    selectedLabels: [],
    workingHours: {
        start: 9,
        end: 17,
    },
};

export const getCalendarPreference = (): CalendarPreference => {
    const storedPreferences = localStorage.getItem(StorageKeys.CalendarPreference);
    if (!storedPreferences) {
        localStorage.setItem(StorageKeys.CalendarPreference, JSON.stringify(DEFAULT_PREFERENCES));
        return DEFAULT_PREFERENCES;
    }

    try {
        return JSON.parse(storedPreferences);
    } catch {
        localStorage.removeItem(StorageKeys.CalendarPreference);
        return DEFAULT_PREFERENCES;
    }
};

export const getCalendarView = (): CalendarView | null => {
    const storedState = localStorage.getItem(StorageKeys.CalendarView);
    if (!storedState) return null;

    try {
        return JSON.parse(storedState);
    } catch {
        localStorage.removeItem(StorageKeys.CalendarView);
        return null;
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

export const saveCalendarView = (state: CalendarView): void => {
    localStorage.setItem(StorageKeys.CalendarView, JSON.stringify(state));
};

export const getWorkingHours = () => {
    const preferences = getCalendarPreference();
    return preferences.workingHours;
};

export const saveWorkingHours = (start: number, end: number): void => {
    const preferences = getCalendarPreference();
    saveCalendarPreference({
        ...preferences,
        workingHours: { start, end },
    });
};

export const clearCalendarStorage = (): void => {
    localStorage.removeItem(StorageKeys.CalendarPreference);
    localStorage.removeItem(StorageKeys.CalendarView);
};
