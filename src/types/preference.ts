export enum PreferenceDateFormat {
    US = "MM/dd/yyyy",       // 12/31/2024
    UK = "dd/MM/yyyy",       // 31/12/2024
    ISO = "yyyy-MM-dd",      // 2024-12-31
    EuropeanDot = "dd.MM.yyyy", // 31.12.2024
    ShortUS = "MM/dd/yy",    // 12/31/24
    ShortUK = "dd/MM/yy"     // 31/12/24
}

export enum PreferenceActivityCount {
	few = 10,
	regular = 30,
	many = 50,
}
export interface UserPreferences {
    isDarkMode: boolean;
    dateFormat: PreferenceDateFormat;
    username: string;
    showCompletedEvents: boolean;
    recentActivitiesCount: PreferenceActivityCount;
}