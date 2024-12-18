import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TASK_PROGRESS_LEGEND_DATA, TOOLTIP_STYLE } from "./constants";
import DashboardItem from "../DashboardItem/DashboardItem";
import useTaskProgress from "@/hooks/useTaskProgress";
import { DashboardChildProps } from "@/types/dashboard";

export default function TaskProgressChart({ tasks, timeFilter }: DashboardChildProps) {
    const data = useTaskProgress(tasks, timeFilter);

    return (
        <DashboardItem title="Task Progress" hasContainer>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <XAxis dataKey="date" fontSize={14} />
                    <YAxis fontSize={14} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    {TASK_PROGRESS_LEGEND_DATA.map(({ key, color }) => (
                        <Area key={key} type="monotone" dataKey={key} stackId="1" stroke={color} fill={color} />
                    ))}
                    <Legend />
                </AreaChart>
            </ResponsiveContainer>
        </DashboardItem>
    );
}
