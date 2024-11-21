import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DASHBOARD_COLORS } from "@/components/Dashboard";

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
                {[
                    { key: "completed", color: DASHBOARD_COLORS[1] },
                    { key: "pending", color: DASHBOARD_COLORS[3] },
                    { key: "overdue", color: DASHBOARD_COLORS[2] }
                ].map(({ key, color }) => (
                    <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stackId="1"
                        stroke={color}
                        fill={color}
                    />
                ))}
                <Legend />
            </AreaChart>
        </ResponsiveContainer>
    );
}