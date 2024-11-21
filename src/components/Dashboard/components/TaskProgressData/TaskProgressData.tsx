import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TASK_PROGRESS_LEGEND_DATA } from "./constants";

export interface TaskProgressData {
    date: string;
    completed: number;
    pending: number;
    overdue: number;
}

interface TaskProgressChartProps {
    data: TaskProgressData[];
}

export default function TaskProgressChart({ data }: TaskProgressChartProps) {
    return (
        <ResponsiveContainer>
            <AreaChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {TASK_PROGRESS_LEGEND_DATA.map(({ key, color }) => (
                    <Area key={key} type="monotone" dataKey={key} stackId="1" stroke={color} fill={color} />
                ))}
                <Legend />
            </AreaChart>
        </ResponsiveContainer>
    );
}
