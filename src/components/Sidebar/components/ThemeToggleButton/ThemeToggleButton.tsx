import { DarkIcon, LightIcon } from "@/assets/icons";
import { usePreferences } from "@/context/PreferenceContext";

import "./ThemeToggleButton.scss";
import Tooltip from "@/components/Tooltip";

export default function ThemeToggleButton() {
    const { preferences, updatePreferences } = usePreferences();

    const toggleDarkMode = () => updatePreferences({ isDarkMode: !preferences.isDarkMode });

    return (
        <Tooltip content={`switch to ${preferences.isDarkMode ? "light" : "dark"} mode`}>
            <button className="theme-toggle-button" onClick={toggleDarkMode}>
                {preferences.isDarkMode ? <LightIcon /> : <DarkIcon />}
            </button>
        </Tooltip>
    );
}
