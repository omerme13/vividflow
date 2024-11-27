export enum PreferenceDateFormat {
    "MM/DD/YYYY" = "MM/dd/yyyy",
    "DD/MM/YYYY" = "dd/MM/yyyy",
    "YYYY-MM-DD" = "yyyy-MM-dd",
    "DD.MM.YYY" = "dd.MM.yyyy",
    "MM/DD/YY" = "MM/dd/yy",
    "DD/MM/YY" = "dd/MM/yy",
}

export enum PreferenceActivityCount {
    Few = "10",
    Regular = "30",
    Many = "50",
}
export interface UserPreferences {
    isDarkMode: boolean;
    dateFormat: PreferenceDateFormat;
    username: string;
    showCompletedEvents: boolean;
    recentActivitiesCount: PreferenceActivityCount;
}
