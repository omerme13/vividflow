import SidebarItem from "./components/SidebarItem/SidebarItem";
import { SidebarActions, sidebarItems } from "./constants";
import UserDetails from "./components/UserDetails/UserDetails";
import NewTaskButton from "./components/NewTaskButton/NewTaskButton";
import { Logo } from "@/assets/icons";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";

import "./Sidebar.scss";

const actions = {
    [SidebarActions.tasks]: () => {},
    [SidebarActions.calendar]: () => {},
    [SidebarActions.dashboard]: () => {},
    [SidebarActions.settings]: () => {},
};
interface SidebarProps {
    openNewTaskModal: () => void;
}

export default function Sidebar({ openNewTaskModal }: SidebarProps) {
    return (
        <div className="sidebar">
            <UserDetails name="Omer" />
            <NewTaskButton onClick={openNewTaskModal} />
            <div className="sidebar__items-container">
                {sidebarItems.map(({ text, icon }) => (
                    <SidebarItem key={text} text={text} icon={icon} action={actions[text]} />
                ))}
            </div>
            <div className="sidebar__bottom">
				<ThemeToggleButton />
                <Logo className="sidebar__logo" />
            </div>
        </div>
    );
}
