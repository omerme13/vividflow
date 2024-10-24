import { SidebarItemProps } from "./SidebarItem.types";

import "./SidebarItem.scss";

export default function SidebarItem({ text, action, icon: Icon }: SidebarItemProps) {
    return (
        <div className="sidebar-item">
            <Icon className="sidebar-item__icon" onClick={action} />
            <div className="sidebar-item__text">{text}</div>
        </div>
    );
}
