import { DASHBOARD_COLORS } from "@/pages/DashboardPage/constants";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

export const CHART_TOOLTIP_STYLES = {
    background: "var(--color-purple-10)",
    border: "none",
    boxShadow: "var(--shadow-1)",
    padding: "0.4rem 0.8rem",
    borderRadius: "var(--radius-xs)"
};

export const CHART_ITEM_STYLES = {
    color: "var(--color-main-text)",
    fontSize: "1.2rem"
};

interface TaskDistributionChartProps {
    data: Array<{ name: string; value: number }>;
}

export default function TaskDistributionChart({ data }: TaskDistributionChartProps) {
    return (
        <ResponsiveContainer>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {data.map((_, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={DASHBOARD_COLORS[index % DASHBOARD_COLORS.length]} 
                        />
                    ))}
                </Pie>
                <Tooltip contentStyle={CHART_TOOLTIP_STYLES} itemStyle={CHART_ITEM_STYLES} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}