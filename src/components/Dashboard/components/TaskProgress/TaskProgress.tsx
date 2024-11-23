import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TASK_PROGRESS_LEGEND_DATA } from "./constants";
import DashboardItem from "../DashboardItem/DashboardItem";
import useTaskProgress from "@/hooks/useTaskProgress";
import { DashboardChildProps } from "@/types/dashboard";

export interface TaskProgress {
    date: string;
    completed: number;
    pending: number;
    overdue: number;
}

export default function TaskProgressChart({ tasks, timeFilter }: DashboardChildProps) {
    const data = useTaskProgress(tasks, timeFilter);

    return (
        <DashboardItem title="Task Progress" hasContainer>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <XAxis dataKey="date" fontSize={14} />
                    <YAxis fontSize={14} />
                    <Tooltip />
                    {TASK_PROGRESS_LEGEND_DATA.map(({ key, color }) => (
                        <Area key={key} type="monotone" dataKey={key} stackId="1" stroke={color} fill={color} />
                    ))}
                    <Legend />
                </AreaChart>
            </ResponsiveContainer>
        </DashboardItem>
    );
}
