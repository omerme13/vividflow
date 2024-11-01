import { SidebarItemProps } from "./SidebarItem.types";

import "./SidebarItem.scss";
import Tooltip from "@/components/Tooltip";

export default function SidebarItem({ text, action, icon: Icon, isCompactSidebar }: SidebarItemProps) {
    return (
        <Tooltip content={isCompactSidebar ? text : ""}>
            <div className="sidebar-item">
                <Icon className="sidebar-item__icon" onClick={action} />
                {!isCompactSidebar && <div className="sidebar-item__text">{text}</div>}
            </div>
        </Tooltip>
    );
}
