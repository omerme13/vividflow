import { useMemo } from "react";
import { TaskData, TaskColors } from "@/types/task";
import { TimeFilter } from "@/types/dashboard";
import { filterTasksByTimeRange, isOverdue, isDueSoon } from "@/utils/dashboardTimeFilters";

export default function useTaskStats(tasks: TaskData[], timeFilter: TimeFilter) {
    return useMemo(() => {
        const tasksInPeriod = filterTasksByTimeRange(tasks, timeFilter);

        const total = tasksInPeriod.length;
        const completed = tasksInPeriod.filter((task) => task.completedAt).length;

        const overdue = tasks.filter((task) => !task.completedAt && task.dueDate && isOverdue(task.dueDate)).length;

        const dueSoon = tasks.filter((task) => !task.completedAt && task.dueDate && isDueSoon(task.dueDate)).length;

        const colorCounts = Object.values(TaskColors).reduce(
            (acc, color) => ({
                ...acc,
                [color]: tasksInPeriod.filter((task) => task.color === color).length,
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
