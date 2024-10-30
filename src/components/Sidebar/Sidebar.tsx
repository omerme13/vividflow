import SidebarItem from "./components/SidebarItem/SidebarItem";
import { sidebarItems } from "./constants";
import UserDetails from "./components/UserDetails/UserDetails";
import NewTaskButton from "./components/NewTaskButton/NewTaskButton";
import { HamburgerIcon, Logo } from "@/assets/icons";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import { Page } from "@/types/layout";

import "./Sidebar.scss";
import { useLayout } from "@/context/LayoutContext";

const actions = {
    [Page.Tasks]: () => {},
    [Page.Calendar]: () => {},
    [Page.Dashboard]: () => {},
    [Page.Settings]: () => {},
};

export default function Sidebar() {
    const {
        layout: { isCompactSidebar },
        toggleSidebar,
		toggleTaskModal
    } = useLayout();

	
    return (
        <div className={`sidebar ${isCompactSidebar ? "sidebar--compact" : ""}`}>
            <div className="sidebar__top-container">
                {!isCompactSidebar && <UserDetails name="Omer" />}
                <HamburgerIcon className="sidebar__toggle-compact-button" onClick={toggleSidebar} />
            </div>
            <NewTaskButton onClick={toggleTaskModal} isCompactSidebar={isCompactSidebar} />
            <div className="sidebar__items-container">
                {sidebarItems.map(({ text, icon }) => (
                    <SidebarItem
                        key={text}
                        text={text}
                        icon={icon}
                        action={actions[text]}
                        isCompactSidebar={isCompactSidebar}
                    />
                ))}
            </div>
            <div className="sidebar__bottom">
                <ThemeToggleButton />
                {!isCompactSidebar && <Logo className="sidebar__logo" />}
            </div>
        </div>
    );
}
