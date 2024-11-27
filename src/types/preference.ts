export enum PreferenceDateFormat {
    US = "MM/dd/yyyy",
    UK = "dd/MM/yyyy",
    ISO = "yyyy-MM-dd",
    EuropeanDot = "dd.MM.yyyy",
    ShortUS = "MM/dd/yy",
    ShortUK = "dd/MM/yy",
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
