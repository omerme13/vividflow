import { DASHBOARD_COLORS } from "../../constants";

export const TASK_PROGRESS_LEGEND_DATA = [
    { key: "completed", color: DASHBOARD_COLORS[1] },
    { key: "pending", color: DASHBOARD_COLORS[3] },
    { key: "overdue", color: DASHBOARD_COLORS[2] },
] as const;

export const TOOLTIP_STYLE: React.CSSProperties = {
	background: 'var(--color-purple-10)',
	border: 'none',
	borderRadius: 'var(--radius-s)',
	boxShadow: 'var(--shadow-1)',
	textTransform: 'capitalize',
	fontSize: 'var(--font-size-m)'
} as const;