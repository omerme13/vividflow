import SidebarItem from "./components/SidebarItem/SidebarItem";
import { DEFAULT_AVATAR_URL, SIDEBAR_ITEMS } from "./constants";
import { HamburgerIcon, Logo } from "@/assets/icons";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import { useLayout } from "@/context/LayoutContext";
import { getClassWithModifier } from "@/utils/styles";
import Tooltip from "../Tooltip";
import { usePreferences } from "@/context/PreferenceContext";

import "./Sidebar.scss";

export default function Sidebar() {
    const { preferences: { username } } = usePreferences();
	
    const {
        layout: { isCompactSidebar },
        toggleSidebar,
    } = useLayout();

    return (
        <div className={getClassWithModifier("sidebar", "compact", isCompactSidebar)}>
            <HamburgerIcon className="sidebar__toggle-compact-button" onClick={toggleSidebar} />
            <div className="sidebar__user-details">
                <img src={DEFAULT_AVATAR_URL} className="sidebar__user-avatar" />
                {!isCompactSidebar && (
                    <Tooltip className="sidebar__user-name" content={username}>
                        {username}
                    </Tooltip>
                )}
            </div>
            <nav className="sidebar__nav">
                {SIDEBAR_ITEMS.map(({ page, icon }) => (
                    <SidebarItem key={page} page={page} icon={icon} isCompactSidebar={isCompactSidebar} />
                ))}
            </nav>
            <div className="sidebar__bottom">
                <ThemeToggleButton />
                <Logo className="sidebar__logo" />
            </div>
        </div>
    );
}
