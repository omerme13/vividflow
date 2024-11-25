import { formatDistanceToNowStrict } from "date-fns";
import { TaskColors } from "@/types/task";
import DashboardItem from "../DashboardItem/DashboardItem";
import { ACTIVITY_CONFIG } from "./constants";
import { Activity } from "@/types/dashboard";
import { useActivityState } from "@/context/ActivityContext";

import "./RecentActivity.scss";

function ActivityStatus({ activity }: { activity: Activity }) {
    const config = ACTIVITY_CONFIG[activity.type];
    const description =
        typeof config.description === "function"
            ? config.description({
                  dueDate: activity.dueDate,
                  color: activity.color as TaskColors,
                  label: activity.label,
              })
            : config.description;

    return <span className="recent-activity__description">{description}</span>;
}

function ActivityItem({ activity }: { activity: Activity }) {
    const config = ACTIVITY_CONFIG[activity.type];
    const timeAgo = formatDistanceToNowStrict(new Date(activity.timestamp), { addSuffix: true })
        .replace(/ minutes?/, "m")
        .replace(/ hours?/, "h")
        .replace(/ days?/, "d")
        .replace(/ months?/, "m");

    return (
        <div className="recent-activity__item">
            <div className="recent-activity__icon">
                <config.icon color={config.color} />
            </div>
            <div className="recent-activity__content">
                <div className="recent-activity__main">
                    <span className="recent-activity__text">{activity.taskText}</span>
                    <span className="recent-activity__time">{timeAgo}</span>
                </div>
                <ActivityStatus activity={activity} />
            </div>
        </div>
    );
}

export default function RecentActivity() {
    const { activities } = useActivityState();

    return (
        <DashboardItem title="Recent Activity" fullRow>
            <div className="recent-activity scrollbar">
                {activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
        </DashboardItem>
    );
}
