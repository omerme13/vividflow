import { useMemo } from "react";
import { TaskData } from "@/types/task";
import { TimeFilter } from "@/pages/DashboardPage/DashboardPage.types";
import { TaskProgressData } from "@/components/Dashboard/components/TaskProgressData/TaskProgressData";

export default function useTaskProgressData(tasks: TaskData[], timeFilter: TimeFilter): TaskProgressData[] {
    return useMemo(() => {
        const statusTimeline: Record<string, TaskProgressData> = {};

        tasks.forEach((task) => {
            let date: string;

            if (task.completedAt) {
                const completedDate = new Date(task.completedAt);

                switch (timeFilter) {
                    case TimeFilter.Day:
                        date = completedDate.toLocaleDateString();
                        break;
                    case TimeFilter.Week:
                        const week = Math.floor(completedDate.getDate() / 7);
                        date = `Week ${week + 1}`;
                        break;
                    case TimeFilter.Month:
                        date = completedDate.toLocaleString("default", { month: "short" });
                        break;
                    default:
                        date = completedDate.toLocaleDateString();
                }
            } else {
                date = new Date().toLocaleDateString();
            }

            if (!statusTimeline[date]) {
                statusTimeline[date] = {
                    date,
                    completed: 0,
                    overdue: 0,
                    pending: 0,
                };
            }

            if (task.isCompleted) {
                statusTimeline[date].completed++;
            } else if (task.dueDate && new Date(task.dueDate) < new Date()) {
                statusTimeline[date].overdue++;
            } else {
                statusTimeline[date].pending++;
            }
        });

        return Object.values(statusTimeline)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-7);
    }, [tasks, timeFilter]);
}
