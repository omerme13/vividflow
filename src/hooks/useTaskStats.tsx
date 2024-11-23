import { useMemo } from "react";
import { TaskData, TaskColors } from "@/types/task";
import { DashboardTimeFilter } from "@/types/dashboard";

export default function useTaskStats(tasks: TaskData[], timeFilter: DashboardTimeFilter) {
    return useMemo(() => {
        const now = new Date();
        const dueSoonThreshold = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const filteredTasks = tasks.filter((task) => {
            const taskDate = task.completedAt || task.dueDate || new Date();
            const date = new Date(taskDate);

            switch (timeFilter) {
                case DashboardTimeFilter.Day:
                    return date.toDateString() === now.toDateString();
                case DashboardTimeFilter.Week:
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return date >= weekAgo;
                case DashboardTimeFilter.Month:
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                default:
                    return true;
            }
        });

        const total = filteredTasks.length;
        const completed = filteredTasks.filter((t) => t.isCompleted).length;
        const overdue = filteredTasks.filter((t) => !t.isCompleted && t.dueDate && new Date(t.dueDate) < now).length;
        const dueSoon = filteredTasks.filter(
            (t) => !t.isCompleted && t.dueDate && new Date(t.dueDate) > now && new Date(t.dueDate) <= dueSoonThreshold
        ).length;

        const colorCounts = Object.values(TaskColors).reduce(
            (acc, color) => ({
                ...acc,
                [color]: filteredTasks.filter((task) => task.color === color).length,
            }),
            {} as Record<TaskColors, number>
        );

        return {
            total,
            completed,
            overdue,
            dueSoon,
            completionRate: total ? Math.round((completed / total) * 100) : 0,
            colorCounts,
        };
    }, [tasks, timeFilter]);
}
