import { useMemo } from "react";
import { TaskData } from "@/types/task";

interface LabelData {
    name: string;
    value: number;
}

export default function useTaskLabels(tasks: TaskData[]): LabelData[] {
    return useMemo(() => {
        const labels: Record<string, number> = {};
        tasks.forEach((task) => {
            if (task.label) {
                labels[task.label] = (labels[task.label] || 0) + 1;
            }
        });

        const sortedLabels = Object.entries(labels)
            .sort(([, a], [, b]) => b - a)
            .map(([name, value]) => ({ name, value }));

        const mainLabels = sortedLabels.slice(0, 5);
        const othersValue = sortedLabels.slice(5)
            .reduce((sum, item) => sum + item.value, 0);

        return othersValue > 0 
            ? [...mainLabels, { name: "Others", value: othersValue }]
            : mainLabels;
    }, [tasks]);
}