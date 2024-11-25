import { useMemo } from "react";
import { TaskData, TaskColors } from "@/types/task";
import { TimeFilter } from "@/types/dashboard";
import {
    addDays,
    startOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isSameDay,
    isWithinInterval,
    parseISO,
} from "date-fns";

export default function useTaskStats(tasks: TaskData[], timeFilter: TimeFilter) {
    return useMemo(() => {
        const now = startOfDay(new Date());
        const dueSoonThreshold = addDays(now, 1);
        const weekStart = startOfWeek(now);
        const weekEnd = endOfWeek(now);
        const monthStart = startOfMonth(now);
        const monthEnd = endOfMonth(now);

        const isInTimeRange = (date: Date) => {
            switch (timeFilter) {
                case TimeFilter.Day:
                    return isSameDay(date, now);
                case TimeFilter.Week:
                    return isWithinInterval(date, { start: weekStart, end: weekEnd });
                case TimeFilter.Month:
                    return isWithinInterval(date, { start: monthStart, end: monthEnd });
                default:
                    return true;
            }
        };

        const tasksInPeriod = tasks.filter((task) => isInTimeRange(parseISO(task.createdAt)));

        const total = tasksInPeriod.length;
        const completed = tasks.filter((task) => task.completedAt && isInTimeRange(parseISO(task.createdAt))).length;

        const overdue = tasks.filter(
            (task) => !task.completedAt && task.dueDate && parseISO(task.dueDate) < now
        ).length;

        const dueSoon = tasks.filter(
            (task) =>
                !task.completedAt &&
                task.dueDate &&
                parseISO(task.dueDate) > now &&
                parseISO(task.dueDate) <= dueSoonThreshold
        ).length;

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
