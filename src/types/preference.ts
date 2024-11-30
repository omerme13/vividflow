export enum PreferenceDateFormat {
    "MM/DD/YYYY" = "MM/dd/yyyy",
    "DD/MM/YYYY" = "dd/MM/yyyy",
    "YYYY-MM-DD" = "yyyy-MM-dd",
    "MM/DD/YY" = "MM/dd/yy",
    "DD/MM/YY" = "dd/MM/yy",
	"MMM DD, YYYY" = "MMM d, yyyy",
    "MMMM DD, YYYY" = "MMMM d, yyyy",
    "DD MMM YYYY" = "dd MMM yyyy",
}

export enum PreferenceHourFormat {
    "HH:mm" = "HH:mm",
	"hh:mm a" = "hh:mm a",
    "h:mm a" = "h:mm a",
}

export enum PreferenceActivityCount {
    Few = "10",
    Regular = "30",
    Many = "50",
}
export interface UserPreferences {
    isDarkMode: boolean;
    dateFormat: PreferenceDateFormat;
    hourFormat: PreferenceHourFormat;
    username: string;
    showCompletedEvents: boolean;
    recentActivitiesCount: PreferenceActivityCount;
}
