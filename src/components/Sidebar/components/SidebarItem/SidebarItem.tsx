import { SidebarItemProps } from "./SidebarItem.types";
import Tooltip from "@/components/Tooltip";
import { Link, useLocation } from "react-router-dom";
import { getClassWithModifier } from "@/utils/styles";

import "./SidebarItem.scss";

export default function SidebarItem({ page, icon: Icon, isCompactSidebar }: SidebarItemProps) {
    const { pathname } = useLocation();

    return (
        <Tooltip content={isCompactSidebar ? page : ""}>
            <Link className={getClassWithModifier("sidebar-item", "selected", pathname.includes(page))} to={page}>
                <Icon className="sidebar-item__icon" />
                {!isCompactSidebar && <div className="sidebar-item__page">{page}</div>}
            </Link>
        </Tooltip>
    );
}
