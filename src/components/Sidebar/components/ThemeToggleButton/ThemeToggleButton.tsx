import { useState } from "react";
import { DarkIcon, LightIcon } from '@/assets/icons';

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
            {isDarkMode ? <LightIcon /> : <DarkIcon />}
        </button>
    );
}
