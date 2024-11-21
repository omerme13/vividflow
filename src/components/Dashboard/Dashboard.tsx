import { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { TaskColors } from "@/types/task";
import { getClassWithModifier } from "@/utils/styles";
import useTaskStats from "@/hooks/useTaskStats";
import useTaskLabels from "@/hooks/useTasksLabels";
import TaskDistributionChart from "@/components/Dashboard/components/TaskDistributionChart/TaskDistributionChart";
import TaskProgressChart from "@/components/Dashboard/components/TaskProgressData/TaskProgressData";
import RecentActivity from "@/components/Dashboard/components/RecentActivity/RecentActivity";
import useTaskProgressData from "@/hooks/useTaskProgressData";
import { StatBoxProps, TimeFilter } from "./Dashboard.types";

import "./Dashboard.scss";


export  function StatBox({ label, value, color }: StatBoxProps) {
    return (
        <div className={`dashboard__stat-box dashboard__stat-box--${color}`}>
            <div className="dashboard__stat-box-value">{value}</div>
            <div className="dashboard__stat-box-label">{label}</div>
        </div>
    );
}

export default function Dashboard() {
    const { tasks } = useTaskContext();
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.Week);

    const stats = useTaskStats(tasks);
    const labelData = useTaskLabels(tasks);
    const statusData = useTaskProgressData(tasks, timeFilter);

    return (
        <div className="dashboard">
            <div className="dashboard__card">
                <div className="dashboard__header">
                    <h2 className="dashboard__title">Task Overview</h2>
                </div>
                <div className="dashboard__info-boxes">
                    <StatBox label="Total Tasks" value={stats.total} color={TaskColors.Blue} />
                    <StatBox label="Completion Rate" value={stats.completionRate} color={TaskColors.Green} />
                    <StatBox label="Overdue" value={stats.overdue} color={TaskColors.Red} />
                </div>
            </div>

            <div className="dashboard__card">
                <div className="dashboard__header">
                    <h2 className="dashboard__title">Tasks by Category</h2>
                </div>
                <div className="dashboard__chart-container">
                    <TaskDistributionChart data={labelData} />
                </div>
            </div>

            <div className="dashboard__card dashboard__card--full">
                <div className="dashboard__header">
                    <h2 className="dashboard__title">Task Progress</h2>
                    <div className="dashboard__filters">
                        {Object.values(TimeFilter).map((filter) => (
                            <button
                                key={filter}
                                className={getClassWithModifier("dashboard__filter", "active", timeFilter === filter)}
                                onClick={() => setTimeFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="dashboard__chart-container">
                    <TaskProgressChart data={statusData} />
                </div>
            </div>

            <div className="dashboard__card dashboard__card--full">
                <div className="dashboard__header">
                    <h2 className="dashboard__title">Recent Activity</h2>
                </div>
                <RecentActivity tasks={tasks} />
            </div>
        </div>
    );
}
