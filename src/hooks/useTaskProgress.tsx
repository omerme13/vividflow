import { useMemo } from "react";
import { TaskData } from "@/types/task";
import { TaskProgress } from "@/components/Dashboard/components/TaskProgress/TaskProgress";
import { TimeFilter } from "@/types/dashboard";
import { format, subDays, subWeeks, subMonths, startOfWeek, startOfDay, isSameWeek, isSameMonth } from "date-fns";

interface DateRangeItem {
    date: Date;
    display: string;
}

const getDateRange = (timeFilter: TimeFilter): DateRangeItem[] => {
    const now = startOfDay(new Date());

    switch (timeFilter) {
        case TimeFilter.Day:
            return Array.from({ length: 14 }, (_, i) => ({
                date: subDays(now, 13 - i),
                display: format(subDays(now, 13 - i), "dd/MM/yyyy"),
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

const categorizeTasks = (
    tasks: TaskData[],
    dateRange: DateRangeItem[],
    timeFilter: TimeFilter
): TaskProgress[] => {
    const today = new Date();
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
        const taskDate = task.completedAt ? new Date(task.completedAt) : new Date();
        let periodKey: string | undefined;

        switch (timeFilter) {
            case TimeFilter.Day:
                periodKey = dateRange.find(
                    (d) => format(d.date, "dd/MM/yyyy") === format(taskDate, "dd/MM/yyyy")
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
            if (task.isCompleted) {
                statusTimeline[periodKey].completed++;
            } else if (task.dueDate && new Date(task.dueDate) < today) {
                statusTimeline[periodKey].overdue++;
            } else {
                statusTimeline[periodKey].pending++;
            }
        }
    });

    return Object.values(statusTimeline);
};

export default function useTaskProgress(tasks: TaskData[], timeFilter: TimeFilter): TaskProgress[] {
    return useMemo(() => {
        const dateRange = getDateRange(timeFilter);
        return categorizeTasks(tasks, dateRange, timeFilter);
    }, [tasks, timeFilter]);
}
