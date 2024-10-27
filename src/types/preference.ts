export interface UserPreferences {
	isDarkMode: boolean;
	isCompactSidebar: boolean;
	isTaskView: boolean;
  }
  
  export type PreferencesContextType = {
	preferences: UserPreferences;
	updatePreference: (updates: Partial<UserPreferences>) => void;
  };