import SidebarItem from "./components/SidebarItem/SidebarItem";
import { sidebarItems } from "./constants";
import NewTaskButton from "./components/NewTaskButton/NewTaskButton";
import { HamburgerIcon, Logo } from "@/assets/icons";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import { Page } from "@/types/layout";

import "./Sidebar.scss";
import { useLayout } from "@/context/LayoutContext";
import { getClassWithModifier } from "@/utils/styles";

export const defaultAvatarUrl = "/src/assets/icons/avatar.svg";

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
        toggleTaskModal,
    } = useLayout();

    return (
        <div className={getClassWithModifier("sidebar", "compact", isCompactSidebar)}>
            <HamburgerIcon
                className={getClassWithModifier("sidebar__toggle-compact-button", "compact", isCompactSidebar)}
                onClick={toggleSidebar}
            />
            <div className={getClassWithModifier("sidebar__top-container", "compact", isCompactSidebar)}>
                <div className="sidebar__user-details">
                    <img src={defaultAvatarUrl} className="sidebar__user-avatar" />
                    {!isCompactSidebar && <div className="sidebar__user-name">{"Omer"}</div>}
                </div>
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
