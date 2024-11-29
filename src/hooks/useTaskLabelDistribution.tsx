import { useMemo } from 'react';
import { TaskData } from '@/types/task';
import { TimeFilter } from '@/types/dashboard';
import { filterTasksByTimeRange } from '@/utils/dashboardTimeFilters';

interface LabelChartData {
    label: string;
    count: number;
    percentage: string;
}

export function useTaskLabelDistribution(tasks: TaskData[], timeFilter: TimeFilter): LabelChartData[] {
    return useMemo(() => {
        const tasksInPeriod = filterTasksByTimeRange(tasks, timeFilter);

        const labelCounts = tasksInPeriod.reduce<Record<string, number>>((acc, task) => {
            const label = task.label || "Unassigned";
            acc[label] = (acc[label] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(labelCounts)
            .map(([label, count]) => ({
                label,
                count,
                percentage: ((count / tasksInPeriod.length) * 100).toFixed(1),
            }))
            .sort((a, b) => b.count - a.count);
    }, [tasks, timeFilter]);
}