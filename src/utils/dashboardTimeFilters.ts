import { startOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, isWithinInterval, parseISO, addDays } from "date-fns";
import { TimeFilter } from "@/types/dashboard";
import { TaskData } from "@/types/task";

export const getTimeRange = () => {
    const now = startOfDay(new Date());
    return {
        now,
        weekStart: startOfWeek(now),
        weekEnd: endOfWeek(now),
        monthStart: startOfMonth(now),
        monthEnd: endOfMonth(now),
        dueSoonThreshold: addDays(now, 1),
    };
};

export const isInTimeRange = (date: Date, timeFilter: TimeFilter, timeRange: ReturnType<typeof getTimeRange>) => {
    switch (timeFilter) {
        case TimeFilter.Day:
            return isSameDay(date, timeRange.now);
        case TimeFilter.Week:
            return isWithinInterval(date, { start: timeRange.weekStart, end: timeRange.weekEnd });
        case TimeFilter.Month:
            return isWithinInterval(date, { start: timeRange.monthStart, end: timeRange.monthEnd });
        default:
            return true;
    }
};

export const filterTasksByTimeRange = (tasks: TaskData[], timeFilter: TimeFilter): TaskData[] => {
    const timeRange = getTimeRange();
    return tasks.filter(task => isInTimeRange(parseISO(task.createdAt), timeFilter, timeRange));
};