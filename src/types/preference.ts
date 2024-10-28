export interface UserPreferences {
	isDarkMode: boolean;
  }
  
  export type PreferencesContextType = {
	preferences: UserPreferences;
	updatePreference: (updates: Partial<UserPreferences>) => void;
  };