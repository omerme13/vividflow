// RecentActivity.tsx
import { useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { TaskColors, TaskData } from "@/types/task";
import { DashboardChildProps } from "@/types/dashboard";
import DashboardItem from "../DashboardItem/DashboardItem";

import "./RecentActivity.scss";

enum ActivityType {
    COMPLETED = "completed",
    UNDONE = "undone",
    CREATED = "created",
    DELETED = "deleted",
    DUE_DATE = "due_date",
    DUE_SOON = "due_soon",
    TEXT_UPDATED = "text_updated",
    COLOR_CHANGED = "color_changed",
}

interface ActivityConfig {
    icon: string;
    description: string | ((date?: Date) => string);
}

const ACTIVITY_CONFIG: Record<ActivityType, ActivityConfig> = {
    [ActivityType.COMPLETED]: {
        icon: "✓",
        description: "Completed",
    },
    [ActivityType.UNDONE]: {
        icon: "🔄",
        description: "Marked as incomplete",
    },
    [ActivityType.CREATED]: {
        icon: "➕",
        description: "Created",
    },
    [ActivityType.DELETED]: {
        icon: "🗑️",
        description: "Deleted",
    },
    [ActivityType.DUE_DATE]: {
        icon: "📅",
        description: (date?: Date) => `Due date set to ${date ? format(date, "MMM d") : ""}`,
    },
    [ActivityType.DUE_SOON]: {
        icon: "⚠️",
        description: "Due in 24 hours",
    },
    [ActivityType.TEXT_UPDATED]: {
        icon: "✏️",
        description: "Text updated",
    },
    [ActivityType.COLOR_CHANGED]: {
        icon: "🎨",
        description: (color?: TaskColors) => `Changed color to ${color || ""}`,
    },
};

interface ActivityItem {
    id: string;
    text: string;
    type: ActivityType;
    timestamp: Date;
    dueDate?: Date;
    color?: string;
}

function useRecentActivity(tasks: TaskData[]) {
    return useMemo(() => {
        const activities: ActivityItem[] = tasks
            .reduce<ActivityItem[]>((acc, task) => {
                const items: ActivityItem[] = [];

                // Example activity types - you'll need to track these changes in your task context
                if (task.completedAt) {
                    items.push({
                        id: `${task.id}-completed`,
                        text: task.text,
                        type: ActivityType.COMPLETED,
                        timestamp: new Date(task.completedAt),
                    });
                }

                if (task.dueDate) {
                    items.push({
                        id: `${task.id}-due`,
                        text: task.text,
                        type: ActivityType.DUE_DATE,
                        timestamp: new Date(),
                        dueDate: new Date(task.dueDate),
                    });
                }

                return [...acc, ...items];
            }, [])
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, 5);

        return activities;
    }, [tasks]);
}

function ActivityStatus({ activity }: { activity: ActivityItem }) {
    const config = ACTIVITY_CONFIG[activity.type];
    const description =
        typeof config.description === "function" ? config.description(activity.dueDate) : config.description;

    return <span className="recent-activity__description">{description}</span>;
}

function ActivityItem({ activity }: { activity: ActivityItem }) {
    const config = ACTIVITY_CONFIG[activity.type];
    const timeAgo = formatDistanceToNow(activity.timestamp, { addSuffix: true });

    return (
        <div className="recent-activity__item">
            <div className="recent-activity__icon">{config.icon}</div>
            <div className="recent-activity__content">
                <div className="recent-activity__main">
                    <span className="recent-activity__text">{activity.text}</span>
                    <span className="recent-activity__time">{timeAgo}</span>
                </div>
                <ActivityStatus activity={activity} />
            </div>
        </div>
    );
}

export default function RecentActivity({ tasks }: DashboardChildProps) {
    const activities = useRecentActivity(tasks);

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
