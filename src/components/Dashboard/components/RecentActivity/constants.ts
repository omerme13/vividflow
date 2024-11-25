import { ActivityType } from "@/types/dashboard";
import { format } from "date-fns";
import { FC, SVGProps } from "react";
import {
    TrashIcon,
    PaletteIcon,
    CalendarIcon,
    TaskIcon,
    UndoIcon,
    PlusIcon,
    EditIcon,
    LabelIcon,
} from "@/assets/icons";
interface Test {
    dueDate?: string;
    color?: string;
    label?: string;
}
interface ActivityConfig {
    icon: FC<SVGProps<SVGSVGElement>> | string;
    description: string | (({ dueDate, color, label }: Test) => string);
    color: string;
}

export const ACTIVITY_CONFIG: Record<ActivityType, ActivityConfig> = {
    [ActivityType.Created]: {
        icon: PlusIcon,
        description: "Created",
        color: "var(--color-cta)",
    },
    [ActivityType.Deleted]: {
        icon: TrashIcon,
        description: "Deleted",
        color: "var(--color-red)",
    },
    [ActivityType.DueDateSet]: {
        icon: CalendarIcon,
        description: ({ dueDate }) => (dueDate ? `Due date set to ${format(new Date(dueDate), "MMM d")}` : "Due date removed"),
        color: "var(--color-cta)",
    },
    [ActivityType.ColorChanged]: {
        icon: PaletteIcon,
        description: ({ color }) => `Changed color to ${color || ""}`,
        color: "var(--color-cta)",
    },
    [ActivityType.LabelChanged]: {
        icon: LabelIcon,
        description: ({ label }) => `Label changed to ${label || ""}`,
        color: "var(--color-cta)",
    },
    [ActivityType.TextUpdated]: {
        icon: EditIcon,
        description: "Text updated",
        color: "var(--color-cta)",
    },
    [ActivityType.Completed]: {
        icon: TaskIcon,
        description: "Completed",
        color: "var(--color-green)",
    },
    [ActivityType.Undone]: {
        icon: UndoIcon,
        description: "Marked as incomplete",
        color: "var(--color-cta)",
    },
    [ActivityType.UndoDelete]: {
        icon: UndoIcon,
        description: "Deletion undone",
        color: "var(--color-cta)",
    },
};
