import { ActivityType } from "@/types/dashboard";
import { TaskColors } from "@/types/task";
import { format } from "date-fns";

interface ActivityConfig {
    icon: string;
    description: string | ((date?: string, color?: TaskColors) => string);
}
export const ACTIVITY_CONFIG: Record<ActivityType, ActivityConfig> = {
    [ActivityType.Created]: {
        icon: "➕",
        description: "Created",
    },
    [ActivityType.Deleted]: {
        icon: "🗑️",
        description: "Deleted",
    },
    [ActivityType.DueDateSet]: {
        icon: "📅",
        description: (date?: string) => (date ? `Due date set to ${format(new Date(date), "MMM d")}` : "Due date removed"),
    },
    [ActivityType.ColorChanged]: {
        icon: "🎨",
        description: (_, color?: TaskColors) => `Changed color to ${color || ""}`,
    },
    [ActivityType.TextUpdated]: {
        icon: "✏️",
        description: "Text updated",
    },
    [ActivityType.Completed]: {
        icon: "✓",
        description: "Completed",
    },
    [ActivityType.Undone]: {
        icon: "🔄",
        description: "Marked as incomplete",
    },
};
