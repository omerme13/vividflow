import { StorageKeys, DEFAULT_ACTIVITIES } from "./constants";
import { Activity } from "@/types/dashboard";

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