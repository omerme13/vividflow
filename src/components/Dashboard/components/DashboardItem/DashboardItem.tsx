import { getClassWithModifier } from "@/utils/styles";
import "./DashboardItem.scss";
import { DashboardItemProps } from "./DashboardItem.types";

export default function DashboardItem({ title, fullRow, hasContainer, children, className = "" }: DashboardItemProps) {
    return (
        <div className={`${className} ${getClassWithModifier("dashboard-item", "full", !!fullRow)}`}>
            <h2 className="dashboard-item__title">{title}</h2>
            {hasContainer ? <div className="dashboard-item__container">{children}</div> : children}
        </div>
    );
}
