import { SidebarItemProps } from "./SidebarItem.types";

import "./SidebarItem.scss";

export default function SidebarItem({ text, action, icon: Icon, isCompactSidebar }: SidebarItemProps) {
    return (
        <div className="sidebar-item">
            <Icon className="sidebar-item__icon" onClick={action} />
            {!isCompactSidebar && <div className="sidebar-item__text">{text}</div>}
        </div>
    );
}
