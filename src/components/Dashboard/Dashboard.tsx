import { useTaskContext } from "@/context/TaskContext";
import { TaskColors } from "@/types/task";
import { getPaletteColor } from "@/utils/styles";
import useTaskStats from "@/hooks/useTaskStats";
import TaskProgressChart from "@/components/Dashboard/components/TaskProgress/TaskProgress";
import RecentActivity from "@/components/Dashboard/components/RecentActivity/RecentActivity";
import useTaskProgress from "@/hooks/useTaskProgress";
import { StatProps } from "./Dashboard.types";
import DashboardItem from "./components/DashboardItem/DashboardItem";

import "./Dashboard.scss";

function Stat({ color, value, label }: StatProps) {
    return (
        <div className="dashboard__stat">
            <div className="dashboard__stat-value" style={{ color: color ? getPaletteColor(color) : "" }}>
                {value}
            </div>
            <div className="dashboard__stat-label">{label}</div>
        </div>
    );
}

export default function Dashboard() {
    const { tasks, timeFilter } = useTaskContext();
    const stats = useTaskStats(tasks, timeFilter);
    const statusData = useTaskProgress(tasks, timeFilter);

    return (
        <div className="dashboard">
            <DashboardItem title="Task Overview" className="dashboard__task-overview">
                <div className="dashboard__stats">
                    <Stat value={stats.total} label="total tasks" />
                    <Stat value={`${stats.completionRate}%`} label="completion rate" color={TaskColors.Green} />
                    <Stat value={stats.dueSoon} label="due soon" color={TaskColors.Yellow} />
                    <Stat value={stats.overdue} label="overdue" color={TaskColors.Red} />
                </div>
                <div className="dashboard__color-distribution">
                    {Object.values(TaskColors).map((color) => {
                        if (!stats.colorCounts[color]) return null;

                        return (
                            <div
                                key={color}
                                className="dashboard__color-item"
                                style={{ flex: stats.colorCounts[color] }}
                            >
                                <span className="dashboard__color-count">{stats.colorCounts[color] || 0}</span>
                                <div
                                    className={`dashboard__color-bar`}
                                    style={{ background: getPaletteColor(color) }}
                                />
                            </div>
                        );
                    })}
                </div>
            </DashboardItem>

            <DashboardItem title="Task Progress" hasContainer>
                <TaskProgressChart data={statusData} />
            </DashboardItem>

            <DashboardItem title="Recent Activity" fullRow>
                <RecentActivity tasks={tasks} />
            </DashboardItem>
        </div>
    );
}
