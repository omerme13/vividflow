import { useMemo } from "react";
import { TaskData } from "@/types/task";

export default function useTaskStats(tasks: TaskData[]) {
    return useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter((t) => t.isCompleted).length;
        const overdue = tasks.filter((t) => !t.isCompleted && t.dueDate && new Date(t.dueDate) < new Date()).length;

        return {
            total,
            completed,
            overdue,
            completionRate: total ? Math.round((completed / total) * 100) : 0,
        };
    }, [tasks]);
}