import { FC } from "react";
import SidebarItem from "./SidebarItem";
import { SidebarActions, sidebarItems } from "./constants";

import "./Sidebar.scss";

const actions = {
    [SidebarActions.tasks]: () => {},
    [SidebarActions.calendar]: () => {},
    [SidebarActions.dashboard]: () => {},
    [SidebarActions.settings]: () => {},
};

const Sidebar: FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__items-container">
                {sidebarItems.map(({ text, icon }) => (
                    <SidebarItem key={text} text={text} icon={icon} action={actions[text]} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
