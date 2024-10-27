import { UserPreferences } from "@/types/preference";

export enum StorageKeys {
  Preference = 'vividflow_user_preferences',
  Tasks = 'vividflow_tasks',
  Labels = 'vividflow_labels',
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  isDarkMode: false,
  isCompactSidebar: false,
  isTaskView: false,
} as const;