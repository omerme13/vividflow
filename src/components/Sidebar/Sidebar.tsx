import SidebarItem from "./components/SidebarItem/SidebarItem";
import { sidebarItems } from "./constants";
import UserDetails from "./components/UserDetails/UserDetails";
import NewTaskButton from "./components/NewTaskButton/NewTaskButton";
import { Logo } from "@/assets/icons";
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
interface SidebarProps {
    openNewTaskModal: () => void;
}

export default function Sidebar({ openNewTaskModal }: SidebarProps) {
    const {
        layout: { isCompactSidebar },
    } = useLayout();

    return (
        <div className={`sidebar ${isCompactSidebar ? "sidebar--compact" : ""}`}>
            {!isCompactSidebar && <UserDetails name="Omer" />}
            <NewTaskButton onClick={openNewTaskModal} isCompactSidebar={isCompactSidebar} />
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
