import { useMemo } from "react";
import { TaskData, TaskColors } from "@/types/task";
import { DashboardTimeFilter } from "@/types/dashboard";
import {
    addDays,
    startOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isSameDay,
    isWithinInterval,
} from "date-fns";

export default function useTaskStats(tasks: TaskData[], timeFilter: DashboardTimeFilter) {
    return useMemo(() => {
        const now = startOfDay(new Date());
        const dueSoonThreshold = addDays(now, 1);

        const filteredTasks = tasks.filter((task) => {
            const taskDate = task.completedAt ? new Date(task.completedAt) : new Date();
			const weekStart = startOfWeek(now);
			const weekEnd = endOfWeek(now);
			const monthStart = startOfMonth(now);
			const monthEnd = endOfMonth(now);

            switch (timeFilter) {
                case DashboardTimeFilter.Day:
                    return isSameDay(taskDate, now);
                case DashboardTimeFilter.Week:
                    return isWithinInterval(taskDate, { start: weekStart, end: weekEnd });
                case DashboardTimeFilter.Month:
                    return isWithinInterval(taskDate, { start: monthStart, end: monthEnd });
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
