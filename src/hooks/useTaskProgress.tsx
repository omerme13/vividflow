import { useMemo } from "react";
import { TaskData } from "@/types/task";
import { TimeFilter } from "@/types/dashboard";
import {
    format,
    subDays,
    subWeeks,
    subMonths,
    startOfWeek,
    startOfDay,
    isSameWeek,
    isSameMonth,
    parseISO,
} from "date-fns";
import { usePreferences } from "@/context/PreferenceContext";
import { PreferenceDateFormat } from "@/types/preference";

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
    const now = startOfDay(new Date());

    switch (timeFilter) {
        case TimeFilter.Day:
            return Array.from({ length: 14 }, (_, i) => ({
                date: subDays(now, 13 - i),
                display: format(subDays(now, 13 - i), dateFormat),
            }));
        case TimeFilter.Week:
            return Array.from({ length: 4 }, (_, i) => ({
                date: startOfWeek(subWeeks(now, 3 - i)),
                display: `Week ${i + 1}`,
            }));
        case TimeFilter.Month:
            return Array.from({ length: 6 }, (_, i) => {
                const date = subMonths(now, 5 - i);
                return {
                    date,
                    display: format(date, "MMM"),
                };
            });
        default:
            return [];
    }
};

const categorizeTasks = (tasks: TaskData[], dateRange: DateRangeItem[], timeFilter: TimeFilter, dateFormat: PreferenceDateFormat): TaskProgress[] => {
    const now = new Date();
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
        let periodKey: string | undefined;

        switch (timeFilter) {
            case TimeFilter.Day:
                periodKey = dateRange.find(
                    (d) => format(d.date, dateFormat) === format(taskDate, dateFormat)
                )?.display;
                break;
            case TimeFilter.Week:
                periodKey = dateRange.find((d) => isSameWeek(d.date, taskDate))?.display;
                break;
            case TimeFilter.Month:
                periodKey = dateRange.find((d) => isSameMonth(d.date, taskDate))?.display;
                break;
        }

        if (periodKey && statusTimeline[periodKey]) {
            if (task.completedAt) {
                statusTimeline[periodKey].completed++;
            } else if (task.dueDate && parseISO(task.dueDate) < now) {
                statusTimeline[periodKey].overdue++;
            } else {
                statusTimeline[periodKey].pending++;
            }
        }
    });

    return Object.values(statusTimeline);
};

export default function useTaskProgress(tasks: TaskData[], timeFilter: TimeFilter): TaskProgress[] {
	const { preferences: { dateFormat }} = usePreferences();
	
    return useMemo(() => {
        const dateRange = getDateRange(timeFilter, dateFormat);
        return categorizeTasks(tasks, dateRange, timeFilter, dateFormat);
    }, [tasks, timeFilter, dateFormat]);
}
