import { getClassWithModifier } from "@/utils/styles";
import "./DashboardItem.scss";
import { DashboardItemProps } from "./DashboardItem.types";

export default function DashboardItem({ title, fullRow, hasContainer, filters, children }: DashboardItemProps) {
    return (
        <div className={getClassWithModifier("dashboard-item", "full", !!fullRow)}>
            <div className="dashboard-item__header">
                <h2 className="dashboard-item__title">{title}</h2>
				{filters}
            </div>
            {hasContainer ? <div className="dashboard-item__container">{children}</div> : children}
        </div>
    );
}
