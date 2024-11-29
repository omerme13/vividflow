import { useMemo } from "react";
import { TaskData, TaskColors } from "@/types/task";
import { TimeFilter } from "@/types/dashboard";
import { parseISO } from "date-fns";
import { filterTasksByTimeRange, getTimeRange } from "@/utils/dashboardTimeFilters";

export default function useTaskStats(tasks: TaskData[], timeFilter: TimeFilter) {
    return useMemo(() => {
        const timeRange = getTimeRange();
        const tasksInPeriod = filterTasksByTimeRange(tasks, timeFilter);

        const total = tasksInPeriod.length;
        const completed = tasksInPeriod.filter(task => task.completedAt).length;

        const overdue = tasks.filter(
            task => !task.completedAt && task.dueDate && parseISO(task.dueDate) < timeRange.now
        ).length;

        const dueSoon = tasks.filter(
            task =>
                !task.completedAt &&
                task.dueDate &&
                parseISO(task.dueDate) > timeRange.now &&
                parseISO(task.dueDate) <= timeRange.dueSoonThreshold
        ).length;

        const colorCounts = Object.values(TaskColors).reduce(
            (acc, color) => ({
                ...acc,
                [color]: tasksInPeriod.filter(task => task.color === color).length,
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