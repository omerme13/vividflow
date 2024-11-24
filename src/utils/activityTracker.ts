import { Activity, ActivityType } from "@/types/dashboard";
import { TaskData } from "@/types/task";
import * as dashboardStorage from "./dashboardLocalStorage";

export function trackActivity(type: ActivityType, task: TaskData, extraData?: { dueDate?: string; color?: string }) {
    const activity: Omit<Activity, "id"> = {
        taskId: task.id,
        taskText: task.text,
        type,
        timestamp: new Date().toISOString(),
        ...extraData,
    };

    dashboardStorage.addActivity({ ...activity, id: crypto.randomUUID() });
}

export function compareAndTrackTaskChanges(previousTask: TaskData | undefined, currentTask: TaskData) {
    if (!previousTask) {
        trackActivity(ActivityType.Created, currentTask);
        return;
    }

    if (previousTask.text !== currentTask.text) {
        trackActivity(ActivityType.TextUpdated, currentTask);
    }

    if (previousTask.color !== currentTask.color) {
        trackActivity(ActivityType.ColorChanged, currentTask, { color: currentTask.color });
    }

    if (previousTask.dueDate !== currentTask.dueDate) {
        trackActivity(ActivityType.DueDateSet, currentTask, {
            dueDate: currentTask.dueDate,
        });
    }

    if (!previousTask.completedAt && currentTask.completedAt) {
        trackActivity(ActivityType.Completed, currentTask);
    }

    if (previousTask.completedAt && !currentTask.completedAt) {
        trackActivity(ActivityType.Undone, currentTask);
    }
}
