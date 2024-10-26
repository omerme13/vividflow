import { useState } from "react";
import DarkModeLogo from "@/assets/icons/dark.svg?react";
import LightModeLogo from "@/assets/icons/light.svg?react";

import './ThemeToggleButton.scss';

export default function ThemeToggleButton() {
    const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		const action = isDarkMode ? "remove" : "add";
		document.documentElement.classList[action]("dark");
		setIsDarkMode(value => !value);
	}

    return (
        <button className="theme-toggle-button" onClick={toggleDarkMode}>
            {isDarkMode ? <LightModeLogo /> : <DarkModeLogo />}
        </button>
    );
}
