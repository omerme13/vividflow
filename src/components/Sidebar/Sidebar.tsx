import SidebarItem from "./components/SidebarItem/SidebarItem";
import { sidebarItems } from "./constants";
import { HamburgerIcon, Logo } from "@/assets/icons";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import { useLayout } from "@/context/LayoutContext";
import { getClassWithModifier } from "@/utils/styles";

import "./Sidebar.scss";

export const defaultAvatarUrl = "/src/assets/icons/avatar.svg";

export default function Sidebar() {
    const {
        layout: { isCompactSidebar },
        toggleSidebar,
    } = useLayout();

    return (
        <div className={getClassWithModifier("sidebar", "compact", isCompactSidebar)}>
            <HamburgerIcon className="sidebar__toggle-compact-button" onClick={toggleSidebar} />
            <div className="sidebar__user-details">
                <img src={defaultAvatarUrl} className="sidebar__user-avatar" />
                {!isCompactSidebar && <div className="sidebar__user-name">{"Omer"}</div>}
            </div>
            <nav className="sidebar__nav">
                {sidebarItems.map(({ page, icon }) => (
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
