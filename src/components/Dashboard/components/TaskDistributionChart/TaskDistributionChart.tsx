import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { DASHBOARD_COLORS } from "@/components/Dashboard";
import { CHART_ITEM_STYLES, CHART_TOOLTIP_STYLES } from "./constants";

interface TaskDistributionChartProps {
    data: Array<{ name: string; value: number }>;
}

export default function TaskDistributionChart({ data }: TaskDistributionChartProps) {
    return (
        <ResponsiveContainer>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={DASHBOARD_COLORS[index % DASHBOARD_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip contentStyle={CHART_TOOLTIP_STYLES} itemStyle={CHART_ITEM_STYLES} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
