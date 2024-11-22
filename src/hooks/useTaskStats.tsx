import { useMemo } from "react";
import { TaskData, TaskColors } from "@/types/task";

export default function useTaskStats(tasks: TaskData[]) {
    return useMemo(() => {
        const now = new Date();
        const dueSoonThreshold = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const total = tasks.length;
        const completed = tasks.filter((t) => t.isCompleted).length;
        const overdue = tasks.filter((t) => !t.isCompleted && t.dueDate && new Date(t.dueDate) < now).length;
        const dueSoon = tasks.filter(
            (t) => !t.isCompleted && t.dueDate && new Date(t.dueDate) > now && new Date(t.dueDate) <= dueSoonThreshold
        ).length;

        const colorCounts = Object.values(TaskColors).reduce(
            (acc, color) => ({
                ...acc,
                [color]: tasks.filter((task) => task.color === color).length,
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
    }, [tasks]);
}
