import { DarkIcon, LightIcon } from "@/assets/icons";
import { usePreferences } from "@/context/PreferenceContext";

import "./ThemeToggleButton.scss";

export default function ThemeToggleButton() {
    const { preferences, updatePreference } = usePreferences();

    const toggleDarkMode = () => updatePreference({ isDarkMode: !preferences.isDarkMode });

    return (
        <button className="theme-toggle-button" onClick={toggleDarkMode}>
            {preferences.isDarkMode ? <LightIcon /> : <DarkIcon />}
        </button>
    );
}
