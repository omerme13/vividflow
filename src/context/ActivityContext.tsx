import { Activity, ActivityType } from "@/types/dashboard";
import { TaskData } from "@/types/task";
import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import * as storage from "@/utils/dashboardLocalStorage";

export interface ActivityContextState {
    activities: Activity[];
}

export interface ActivityContextDispatch {
    trackActivity: (type: ActivityType, task: TaskData, extraData?: { dueDate?: string; color?: string }) => void;
    compareAndTrackChanges: (previousTask: TaskData | undefined, currentTask: TaskData) => void;
    clearActivities: () => void;
}

export const ActivityStateContext = createContext<ActivityContextState | undefined>(undefined);
export const ActivityDispatchContext = createContext<ActivityContextDispatch | undefined>(undefined);

export function ActivityProvider({ children }: { children: ReactNode }) {
    const [activities, setActivities] = useState<Activity[]>(() => storage.getActivities());

    const trackActivity = useCallback(
        (type: ActivityType, task: TaskData, extraData?: { dueDate?: string; color?: string }) => {
            const activity: Activity = {
                id: crypto.randomUUID(),
                taskId: task.id,
                taskText: task.text,
                type,
                timestamp: new Date().toISOString(),
                ...extraData,
            };

            storage.addActivity(activity);
            setActivities((prev) => [activity, ...prev].slice(0, 50));
        },
        []
    );

    const compareAndTrackChanges = useCallback(
        (previousTask: TaskData | undefined, currentTask: TaskData) => {
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
        },
        [trackActivity]
    );

    const clearActivities = useCallback(() => {
        storage.clearActivities();
        setActivities([]);
    }, []);

    const dispatchValue = useMemo(
        () => ({
            trackActivity,
            compareAndTrackChanges,
            clearActivities,
        }),
        [trackActivity, compareAndTrackChanges, clearActivities]
    );

    const stateValue = useMemo(
        () => ({
            activities,
        }),
        [activities]
    );

    return (
        <ActivityDispatchContext.Provider value={dispatchValue}>
            <ActivityStateContext.Provider value={stateValue}>{children}</ActivityStateContext.Provider>
        </ActivityDispatchContext.Provider>
    );
}

export function useActivityState() {
    const context = useContext(ActivityStateContext);
    if (context === undefined) {
        throw new Error("useActivityState must be used within an ActivityProvider");
    }
    return context;
}

export function useActivityDispatch() {
    const context = useContext(ActivityDispatchContext);
    if (context === undefined) {
        throw new Error("useActivityDispatch must be used within an ActivityProvider");
    }
    return context;
}