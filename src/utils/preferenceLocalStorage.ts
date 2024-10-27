import { UserPreferences } from "@/types/preference";
import { DEFAULT_PREFERENCES, StorageKeys } from "./constants";

export const getStoredPreferences = (): UserPreferences => {
    const storedPreferences = localStorage.getItem(StorageKeys.Preference);
    if (!storedPreferences) {
        return DEFAULT_PREFERENCES;
    }
    const parsedPreferences = JSON.parse(storedPreferences) as Partial<UserPreferences>;
    return { ...DEFAULT_PREFERENCES, ...parsedPreferences };
};

export const updatePreferences = (newPreferences: Partial<UserPreferences>): UserPreferences => {
    const updatedPreferences = {
        ...getStoredPreferences(),
        ...newPreferences,
    };
    localStorage.setItem(StorageKeys.Preference, JSON.stringify(updatedPreferences));
    return updatedPreferences;
};

export const clearPreferences = (): void => {
    localStorage.removeItem(StorageKeys.Preference);
};
