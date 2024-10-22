import { FC } from "react";
import SidebarItem from "./components/SidebarItem/SidebarItem";
import { SidebarActions, sidebarItems } from "./constants";

import "./Sidebar.scss";
import UserDetails from "./components/UserDetails/UserDetails";
import NewTaskButton from "./components/NewTaskButton/NewTaskButton";

const actions = {
    [SidebarActions.tasks]: () => {},
    [SidebarActions.calendar]: () => {},
    [SidebarActions.dashboard]: () => {},
    [SidebarActions.settings]: () => {},
};

const Sidebar: FC = () => {
    return (
        <div className="sidebar">
			<UserDetails name="Omer" />
			<NewTaskButton />
            <div className="sidebar__items-container">
                {sidebarItems.map(({ text, icon }) => (
                    <SidebarItem key={text} text={text} icon={icon} action={actions[text]} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
