import { DASHBOARD_COLORS } from "../../constants";

export const TASK_PROGRESS_LEGEND_DATA = [
    { key: "completed", color: DASHBOARD_COLORS[1] },
    { key: "pending", color: DASHBOARD_COLORS[3] },
    { key: "overdue", color: DASHBOARD_COLORS[2] },
] as const;
