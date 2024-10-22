import { FC } from "react";
import { SideBarItemData, SidebarProps } from "./Sidebar.interface";

import CheckIcon from "@/assets/icons/check.svg?react";
import DashboardIcon from "@/assets/icons/dashboard.svg?react";
import CalendarIcon from "@/assets/icons/calendar.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";

import "./Sidebar.scss";
import SidebarItem from "./SidebarItem";

const sidebarItems: SideBarItemData[] = [
    { text: "tasks", icon: CheckIcon, action: () => {} },
    { text: "dashboard", icon: DashboardIcon, action: () => {} },
    { text: "calendar", icon: CalendarIcon, action: () => {} },
    { text: "settings", icon: SettingsIcon, action: () => {} },
];
const Sidebar: FC<SidebarProps> = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__items-container">
                {sidebarItems.map((item) => (
                    <SidebarItem key={item.text} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
