import { UserPreferences } from "@/types/preference";
import * as storage from "@/utils/preferenceLocalStorage";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PreferencesContextType {
    preferences: UserPreferences;
    updatePreferences: (updates: Partial<UserPreferences>) => void;
}

const PreferencesContext = createContext<PreferencesContextType>({
    preferences: storage.getStoredPreferences(),
    updatePreferences: () => undefined,
});

interface PreferencesProviderProps {
    children: ReactNode;
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
    const [preferences, setPreferences] = useState<UserPreferences>(storage.getStoredPreferences());

    useEffect(() => {
        const isDark = preferences.isDarkMode;
        document.documentElement.classList.toggle("dark", isDark);
    }, [preferences.isDarkMode]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
            updatePreferences({ isDarkMode: e.matches });
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    function updatePreferences(updates: Partial<UserPreferences>) {
        const newPreferences = storage.updatePreferences(updates);
        setPreferences(newPreferences);
    }

    return (
        <PreferencesContext.Provider value={{ preferences, updatePreferences }}>{children}</PreferencesContext.Provider>
    );
}

export function usePreferences(): PreferencesContextType {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error("usePreferences must be used within a PreferencesProvider");
    }
    return context;
}
