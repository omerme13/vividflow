import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PreferencesContextType, UserPreferences } from "@/types/preference";
import * as preferenceStorage from "@/utils/preferenceLocalStorage";

const PreferencesContext = createContext<PreferencesContextType>({
    preferences: preferenceStorage.getStoredPreferences(),
    updatePreference: () => undefined,
});

interface PreferencesProviderProps {
    children: ReactNode;
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
    const [preferences, setPreferences] = useState<UserPreferences>(preferenceStorage.getStoredPreferences());

    useEffect(() => {
        const isDark = preferences.isDarkMode;
        document.documentElement.classList.toggle("dark", isDark);
    }, [preferences.isDarkMode]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
            updatePreference({ isDarkMode: e.matches });
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    function updatePreference(updates: Partial<UserPreferences>) {
        const newPreferences = preferenceStorage.updatePreferences(updates);
        setPreferences(newPreferences);
    }

    return (
        <PreferencesContext.Provider value={{ preferences, updatePreference }}>{children}</PreferencesContext.Provider>
    );
}

export function usePreferences(): PreferencesContextType {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error("usePreferences must be used within a PreferencesProvider");
    }
    return context;
}
