import { useMemo, useState } from "react";
import { PieChart, Pie, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { useTaskContext } from "@/context/TaskContext";
import { DASHBOARD_COLORS } from "./constants";
import { TimeFilter } from "./DashboardPage.types";
import { TaskData } from "@/types/task";
import { getClassWithModifier } from "@/utils/styles";

import "./DashboardPage.scss";

const getChartColor = (index: number) => DASHBOARD_COLORS[index % DASHBOARD_COLORS.length];

const truncateText = (text: string, maxLength: number = 50) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

const StatBox = ({ label, value, color }) => (
    <div className={`dashboard__stat-box dashboard__stat-box--${color}`}>
        <div className="dashboard__stat-box-value">{value}</div>
        <div className="dashboard__stat-box-label">{label}</div>
    </div>
);

export default function DashboardPage() {
    const { tasks } = useTaskContext();
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.Week);

    const stats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter((t) => t.isCompleted).length;
        const overdue = tasks.filter((t) => !t.isCompleted && t.dueDate && new Date(t.dueDate) < new Date()).length;

        return {
            total,
            completed,
            overdue,
            completionRate: total ? Math.round((completed / total) * 100) : 0,
        };
    }, [tasks]);

    const labelData = useMemo(() => {
        const labels: Record<string, number> = {};
        let totalTasks = 0;

        tasks.forEach((task) => {
            if (task.label) {
                labels[task.label] = (labels[task.label] || 0) + 1;
                totalTasks++;
            }
        });

        const sortedLabels = Object.entries(labels).sort(([, a], [, b]) => b - a);

        const mainLabels = sortedLabels.slice(0, 5).map(([name, value]) => ({ name, value }));
        const othersValue = sortedLabels.slice(5).reduce((sum, [, value]) => sum + value, 0);

        if (othersValue > 0) {
            mainLabels.push({ name: "Others", value: othersValue });
        }

        return mainLabels;
    }, [tasks]);

    const getFilteredData = (filter: string) => {
        const filtered: Record<string, number> = {};

        tasks.forEach((task) => {
            if (!task.completedAt) return;

            const completedDate = new Date(task.completedAt);
            let key: string;

            switch (filter) {
                case TimeFilter.Day:
                    key = completedDate.toLocaleDateString();
                    break;
                case TimeFilter.Week:
                    const week = Math.floor(completedDate.getDate() / 7);
                    key = `Week ${week + 1}`;
                    break;
                case TimeFilter.Month:
                    key = completedDate.toLocaleString("default", { month: "short" });
                    break;
                default:
                    key = completedDate.toLocaleDateString();
            }

            filtered[key] = (filtered[key] || 0) + 1;
        });

        return Object.entries(filtered)
            .map(([date, count]) => ({ date, count }))
            .slice(-7);
    };

    const getStatusData = () => {
        const statusTimeline: Record<string, { completed: number; overdue: number; pending: number }> = {};

        tasks.forEach((task) => {
            const date = task.completedAt
                ? new Date(task.completedAt).toLocaleDateString()
                : new Date().toLocaleDateString();

            if (!statusTimeline[date]) {
                statusTimeline[date] = { completed: 0, overdue: 0, pending: 0 };
            }

            if (task.isCompleted) {
                statusTimeline[date].completed++;
            } else if (task.dueDate && new Date(task.dueDate) < new Date()) {
                statusTimeline[date].overdue++;
            } else {
                statusTimeline[date].pending++;
            }
        });

        return Object.entries(statusTimeline).map(([date, data]) => ({
            date,
            ...data,
        }));
    };

    const timelineData = useMemo(() => getFilteredData(timeFilter), [tasks, timeFilter]);
    const statusData = useMemo(() => getStatusData(), [tasks]);

    const getActivityDescription = (task: TaskData) => {
        if (task.isCompleted) return "Task completed";
        if (task.dueDate && new Date(task.dueDate) < new Date()) return "Task overdue";
        return "Task updated";
    };

    return (
        <div className="dashboard">
            <div className="dashboard__card">
                <div className="dashboard__header">
                    <h2 className="dashboard__title">Task Overview</h2>
                </div>
                <div className="dashboard__info-boxes">
                    <StatBox label="Total Tasks" value={stats.total} color="blue" />
                    <StatBox label="Completion Rate" value={`${stats.completionRate}%`} color="green" />
                    <StatBox label="Overdue" value={stats.overdue} color="red" />
                </div>
            </div>

            <div className="dashboard__card">
                <div className="dashboard__header">
                    <h2 className="dashboard__title">Tasks by Category</h2>
                </div>
                <div className="dashboard__chart-container">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={labelData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                                {labelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getChartColor(index)} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: "var(--color-purple-10",
                                    border: "none",
                                    boxShadow: "var(--shadow-1)",
                                    padding: "0.4rem 0.8rem",
                                    borderRadius: "var(--radius-xs)",
                                }}
                                itemStyle={{ color: "var(--color-main-text)", fontSize: "1.2rem" }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
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
                    <ResponsiveContainer>
                        <AreaChart data={statusData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="completed"
                                stackId="1"
                                stroke={DASHBOARD_COLORS[1]}
                                fill={DASHBOARD_COLORS[1]}
                            />
                            <Area
                                type="monotone"
                                dataKey="pending"
                                stackId="1"
                                stroke={DASHBOARD_COLORS[3]}
                                fill={DASHBOARD_COLORS[3]}
                            />
                            <Area
                                type="monotone"
                                dataKey="overdue"
                                stackId="1"
                                stroke={DASHBOARD_COLORS[2]}
                                fill={DASHBOARD_COLORS[2]}
                            />
                            <Legend />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="dashboard__card dashboard__card--full">
                <div className="dashboard__header">
                    <h2 className="dashboard__title">Recent Activity</h2>
                </div>
                <div className="dashboard__activity">
                    {tasks
                        .filter((t) => t.completedAt || (t.dueDate && new Date(t.dueDate) < new Date()))
                        .sort((a, b) => {
                            const dateA = a.completedAt || a.dueDate || "";
                            const dateB = b.completedAt || b.dueDate || "";
                            return new Date(dateB).getTime() - new Date(dateA).getTime();
                        })
                        .slice(0, 5)
                        .map((task) => (
                            <div key={task.id} className="dashboard__activity-item">
                                <div className="dashboard__activity-main">
                                    <span className="dashboard__activity-text">{truncateText(task.text)}</span>
                                    {task.label && (
                                        <span
                                            className={`dashboard__activity-label dashboard__activity-label--${
                                                task.color || "gray"
                                            }`}
                                        >
                                            {task.label}
                                        </span>
                                    )}
                                </div>
                                <div className="dashboard__activity-info">
                                    <span className="dashboard__activity-status">{getActivityDescription(task)}</span>
                                    {task.dueDate && (
                                        <span className="dashboard__activity-due">
                                            Due: {new Date(task.dueDate).toLocaleString()}
                                        </span>
                                    )}
                                    {task.completedAt && (
                                        <span className="dashboard__activity-date">
                                            {new Date(task.completedAt).toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
