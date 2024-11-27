import { UserPreferences } from "@/types/preference";
import * as storage from "@/utils/preferenceLocalStorage";
import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

interface PreferencesContext {
    preferences: UserPreferences;
    updatePreferences: (updates: Partial<UserPreferences>) => void;
}

const PreferencesContext = createContext<PreferencesContext | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferences] = useState<UserPreferences>(storage.getStoredPreferences());

    useEffect(() => {
        document.documentElement.classList.toggle("dark", preferences.isDarkMode);
    }, [preferences.isDarkMode]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            updatePreferences({ isDarkMode: e.matches });
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
        setPreferences((prev) => ({ ...prev, ...updates }));
        storage.updatePreferences(updates);
    }, []);

    return (
        <PreferencesContext.Provider value={{ preferences, updatePreferences }}>{children}</PreferencesContext.Provider>
    );
}

export function usePreferences() {
    const context = useContext(PreferencesContext);
    if (!context) throw new Error("usePreferences must be used within PreferencesProvider");
    return context;
}
