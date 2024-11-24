import { formatDistanceToNow } from "date-fns";
import { TaskColors } from "@/types/task";
import DashboardItem from "../DashboardItem/DashboardItem";
import { useDashboardContext } from "@/context/DashboardContext";
import { ACTIVITY_CONFIG } from "./constants";
import { Activity } from "@/types/dashboard";

import "./RecentActivity.scss";

function ActivityStatus({ activity }: { activity: Activity }) {
    const config = ACTIVITY_CONFIG[activity.type];
    const description =
        typeof config.description === "function"
            ? config.description(activity.dueDate, activity.color as TaskColors)
            : config.description;

    return <span className="recent-activity__description">{description}</span>;
}

function ActivityItem({ activity }: { activity: Activity }) {
    const config = ACTIVITY_CONFIG[activity.type];
    const timeAgo = formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true });

    return (
        <div className="recent-activity__item">
            <div className="recent-activity__icon">{config.icon}</div>
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
    const { activities } = useDashboardContext();

    return (
        <DashboardItem title="Recent Activity" fullRow>
            <div className="recent-activity">
                {activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
        </DashboardItem>
    );
}
