import { useMemo } from "react";
import { TaskData } from "@/types/task";
import { TimeFilter } from "@/types/dashboard";
import { format, subDays, isSameDay, parseISO, startOfDay } from "date-fns";
import { usePreferences } from "@/context/PreferenceContext";
import { PreferenceDateFormat } from "@/types/preference";
import { isOverdue } from "@/utils/dashboardTimeFilters";

interface DateRangeItem {
    date: Date;
    display: string;
}

interface TaskProgress {
    date: string;
    completed: number;
    pending: number;
    overdue: number;
}

const getDateRange = (timeFilter: TimeFilter, dateFormat: PreferenceDateFormat): DateRangeItem[] => {
    const now = new Date();
    const today = startOfDay(now);

    switch (timeFilter) {
        case TimeFilter.Day:
            return Array.from({ length: 1 }, () => ({
                date: today,
                display: format(today, dateFormat),
            }));

        case TimeFilter.Week:
            return Array.from({ length: 7 }, (_, i) => {
                const date = subDays(today, 6 - i);
                return {
                    date,
                    display: format(date, dateFormat),
                };
            });

        case TimeFilter.Month:
            return Array.from({ length: 30 }, (_, i) => {
                const date = subDays(today, 29 - i);
                return {
                    date,
                    display: format(date, dateFormat),
                };
            });

        case TimeFilter.All:
        default:
            return Array.from({ length: 30 }, (_, i) => {
                const date = subDays(today, 29 - i);
                return {
                    date,
                    display: format(date, dateFormat),
                };
            });
    }
};

const categorizeTasks = (tasks: TaskData[], dateRange: DateRangeItem[]): TaskProgress[] => {
    const statusTimeline: Record<string, TaskProgress> = {};

    dateRange.forEach(({ display }) => {
        statusTimeline[display] = {
            date: display,
            completed: 0,
            overdue: 0,
            pending: 0,
        };
    });

    tasks.forEach((task) => {
        const taskDate = parseISO(task.createdAt);
        const periodKey = dateRange.find((d) => isSameDay(d.date, taskDate))?.display;

        if (periodKey && statusTimeline[periodKey]) {
            if (task.completedAt) {
                statusTimeline[periodKey].completed++;
            } else if (task.dueDate && isOverdue(task.dueDate)) {
                statusTimeline[periodKey].overdue++;
            } else {
                statusTimeline[periodKey].pending++;
            }
        }
    });

    return Object.values(statusTimeline);
};

export default function useTaskProgress(tasks: TaskData[], timeFilter: TimeFilter): TaskProgress[] {
    const {
        preferences: { dateFormat },
    } = usePreferences();

    return useMemo(() => {
        const dateRange = getDateRange(timeFilter, dateFormat);
        return categorizeTasks(tasks, dateRange);
    }, [tasks, timeFilter, dateFormat]);
}
