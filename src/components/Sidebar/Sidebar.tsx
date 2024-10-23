import { FC } from "react";
import SidebarItem from "./components/SidebarItem/SidebarItem";
import { SidebarActions, sidebarItems } from "./constants";
import UserDetails from "./components/UserDetails/UserDetails";
import NewTaskButton from "./components/NewTaskButton/NewTaskButton";
import Logo from "@/assets/icons/vividflow.svg?react";

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
			<UserDetails name="Omer" />
			<NewTaskButton />
            <div className="sidebar__items-container">
                {sidebarItems.map(({ text, icon }) => (
                    <SidebarItem key={text} text={text} icon={icon} action={actions[text]} />
                ))}
            </div>
			<Logo className="sidebar__logo" />
        </div>
    );
};

export default Sidebar;
