import { startOfDay, subDays, isWithinInterval, parseISO, addDays, endOfDay } from "date-fns";
import { TimeFilter } from "@/types/dashboard";
import { TaskData } from "@/types/task";

interface DateRange {
    start: Date;
    end: Date;
}

export const getDateRange = (timeFilter: TimeFilter): DateRange => {
    const now = new Date();
    const today = startOfDay(now);
    const end = endOfDay(now);

    switch (timeFilter) {
        case TimeFilter.Day:
            return { start: today, end };
        case TimeFilter.Week:
            return { start: startOfDay(subDays(today, 6)), end };
        case TimeFilter.Month:
            return { start: startOfDay(subDays(today, 29)), end };
        case TimeFilter.All:
        default:
            return { start: new Date(0), end };
    }
};

export const getDueSoonThreshold = (): Date => {
    return addDays(new Date(), 1);
};

export const isInTimeRange = (date: Date, timeFilter: TimeFilter): boolean => {
    const range = getDateRange(timeFilter);
    return isWithinInterval(date, range);
};

export const filterTasksByTimeRange = (tasks: TaskData[], timeFilter: TimeFilter): TaskData[] => {
    if (timeFilter === TimeFilter.All) return tasks;
    const range = getDateRange(timeFilter);
    return tasks.filter((task) => isWithinInterval(parseISO(task.createdAt), range));
};

export const isOverdue = (dueDate: string): boolean => {
    return parseISO(dueDate) < new Date();
};

export const isDueSoon = (dueDate: string): boolean => {
    return isWithinInterval(parseISO(dueDate), {
        start: new Date(),
        end: getDueSoonThreshold(),
    });
};
