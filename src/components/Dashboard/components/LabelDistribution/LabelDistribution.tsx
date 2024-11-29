import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardChildProps } from "@/types/dashboard";
import DashboardItem from "../DashboardItem/DashboardItem";

import "./LabelDistribution.scss";

interface ChartData {
    label: string;
    count: number;
    percentage: string;
}

export default function LabelDistribution({ tasks }: DashboardChildProps) {
    const labelData = useMemo<ChartData[]>(() => {
        const labelCounts = tasks.reduce<Record<string, number>>((acc, task) => {
            const label = task.label || "Unassigned";
            acc[label] = (acc[label] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(labelCounts)
            .map(([label, count]) => ({
                label,
                count,
                percentage: ((count / tasks.length) * 100).toFixed(1),
            }))
            .sort((a, b) => b.count - a.count);
    }, [tasks]);

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
                    />
                </BarChart>
            </ResponsiveContainer>
        </DashboardItem>
    );
}
