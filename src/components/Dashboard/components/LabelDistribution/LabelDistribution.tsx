import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardChildProps } from "@/types/dashboard";
import DashboardItem from "../DashboardItem/DashboardItem";
import { useTaskLabelDistribution } from "@/hooks/useTaskLabelDistribution";

import "./LabelDistribution.scss";

export default function LabelDistribution({ tasks, timeFilter }: DashboardChildProps) {
    const labelData = useTaskLabelDistribution(tasks, timeFilter);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="label-distribution__tooltip">
                    <p className="label-distribution__tooltip-label">{data.label}</p>
                    <p className="label-distribution__tooltip-value">
                        {data.count} tasks ({data.percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <DashboardItem title="Tasks by Label" hasContainer>
            <ResponsiveContainer>
                <BarChart data={labelData} layout="vertical" margin={{ top: 0, right: 20, left: 40 }}>
                    <XAxis
                        type="number"
                        tick={{ fill: "var(--color-main-text-light)" }}
                        axisLine={{ stroke: "var(--color-gray)" }}
                        fontSize={14}
                    />
                    <YAxis
                        type="category"
                        dataKey="label"
                        width={70}
                        tick={{ fill: "var(--color-main-text)" }}
                        axisLine={{ stroke: "var(--color-gray)" }}
                        fontSize={14}
                        style={{ textTransform: "capitalize" }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-cta-lighter)" }} />
                    <Bar
                        dataKey="count"
                        fill="var(--color-purple-60)"
                        className="label-distribution__bar"
                        radius={[0, 4, 4, 0]}
						maxBarSize={30}
                    />
                </BarChart>
            </ResponsiveContainer>
        </DashboardItem>
    );
}
