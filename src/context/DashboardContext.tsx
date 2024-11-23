import { Activity, TimeFilter } from "@/types/dashboard";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState } from "react";
import * as dashboardStorage from '@/utils/dashboardLocalStorage';

interface DashboardContext {
    activities: Activity[];
    timeFilter: TimeFilter;
    setTimeFilter: Dispatch<SetStateAction<TimeFilter>>;
    addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
    clearActivities: () => void;
}

const DashboardContext = createContext<DashboardContext | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [activities, setActivities] = useState<Activity[]>(() => dashboardStorage.getActivities());
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.Week);

    const addActivity = useCallback((activityData: Omit<Activity, "id" | "timestamp">) => {
        const newActivity = {
            ...activityData,
            id: crypto.randomUUID(),
            timestamp: new Date()
        };

        setActivities(prev => {
            const updated = [newActivity, ...prev].slice(0, 50);
            dashboardStorage.saveActivities(updated);
            return updated;
        });
    }, []);

    const clearActivities = useCallback(() => {
        dashboardStorage.clearActivities();
        setActivities([]);
    }, []);

    const value = useMemo(() => ({
        activities,
        timeFilter,
        setTimeFilter,
        addActivity,
        clearActivities
    }), [activities, timeFilter, addActivity, clearActivities]);

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboardContext() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
}