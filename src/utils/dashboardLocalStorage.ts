import { StorageKeys, DEFAULT_ACTIVITIES, DEFAULT_DASHBOARD_TIME_FILTER } from "./constants";
import { Activity, TimeFilter } from "@/types/dashboard";

export const getTimeFilters = (): TimeFilter => {
    const storedTimeFilter = localStorage.getItem(StorageKeys.DashboardTimeFilter);
    if (!storedTimeFilter) {
        localStorage.setItem(StorageKeys.DashboardTimeFilter, JSON.stringify(DEFAULT_DASHBOARD_TIME_FILTER));
        return DEFAULT_DASHBOARD_TIME_FILTER;
    }

    try {
        return JSON.parse(storedTimeFilter);
    } catch {
        localStorage.removeItem(StorageKeys.DashboardTimeFilter);
        return DEFAULT_DASHBOARD_TIME_FILTER;
    }
};

export const saveTimeFilter = (timeFilter: TimeFilter): void => {
    localStorage.setItem(StorageKeys.DashboardTimeFilter, JSON.stringify(timeFilter));
};


export const getActivities = (): Activity[] => {
    const storedActivities = localStorage.getItem(StorageKeys.Activities);
    if (!storedActivities) {
        localStorage.setItem(StorageKeys.Activities, JSON.stringify(DEFAULT_ACTIVITIES));
        return DEFAULT_ACTIVITIES;
    }

    try {
        return JSON.parse(storedActivities);
    } catch {
        localStorage.removeItem(StorageKeys.Activities);
        return DEFAULT_ACTIVITIES;
    }
};

export const saveActivities = (activities: Activity[]): void => {
    localStorage.setItem(StorageKeys.Activities, JSON.stringify(activities));
};

export const addActivity = (activity: Activity): void => {
    const currentActivities = getActivities();
    const updatedActivities = [activity, ...currentActivities].slice(0, 50);
    saveActivities(updatedActivities);
};

export const clearActivities = (): void => {
    localStorage.removeItem(StorageKeys.Activities);
};