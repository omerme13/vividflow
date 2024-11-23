import { getPaletteColor } from "@/utils/styles";
import { StatProps } from "./TasksOverview.types";
import DashboardItem from "../DashboardItem/DashboardItem";
import useTaskStats from "@/hooks/useTaskStats";
import { TaskColors } from "@/types/task";
import { DashboardChildProps } from "@/types/dashboard";

import "./TasksOverview.scss";

function Stat({ color, value, label }: StatProps) {
    return (
        <div className="tasks-overview__stat">
            <div className="tasks-overview__stat-value" style={{ color: color ? getPaletteColor(color) : "" }}>
                {value}
            </div>
            <div className="tasks-overview__stat-label">{label}</div>
        </div>
    );
}

export default function TasksOverview({tasks, timeFilter}: DashboardChildProps) {
    const stats = useTaskStats(tasks, timeFilter);

    return (
        <DashboardItem title="Task Overview" className="tasks-overview">
            <div className="tasks-overview__stats">
                <Stat value={stats.total} label="total tasks" />
                <Stat value={`${stats.completionRate}%`} label="completion rate" color={TaskColors.Green} />
                <Stat value={stats.dueSoon} label="due soon" color={TaskColors.Yellow} />
                <Stat value={stats.overdue} label="overdue" color={TaskColors.Red} />
            </div>
            <div className="tasks-overview__color-distribution">
                {Object.values(TaskColors).map((color) => {
                    if (!stats.colorCounts[color]) return null;

                    return (
                        <div
                            key={color}
                            className="tasks-overview__color-item"
                            style={{ flex: stats.colorCounts[color] }}
                        >
                            <span className="tasks-overview__color-count">{stats.colorCounts[color] || 0}</span>
                            <div
                                className={`tasks-overview__color-bar`}
                                style={{ background: getPaletteColor(color) }}
                            />
                        </div>
                    );
                })}
            </div>
        </DashboardItem>
    );
}
