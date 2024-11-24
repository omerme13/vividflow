import { createContext, useState, useCallback, useContext, Dispatch, SetStateAction, ReactNode, useMemo } from "react";
import { Activity, TimeFilter } from "@/types/dashboard";
import * as dashboardStorage from "@/utils/dashboardLocalStorage";
interface DashboardContext {
    activities: Activity[];
    timeFilter: TimeFilter;
    setTimeFilter: Dispatch<SetStateAction<TimeFilter>>;
    clearActivities: () => void;
}

const DashboardContext = createContext<DashboardContext | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [activities, setActivities] = useState<Activity[]>(() => dashboardStorage.getActivities());
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.Week);

    const clearActivities = useCallback(() => {
        dashboardStorage.clearActivities();
        setActivities([]);
    }, []);

    const value = useMemo(
        () => ({
            activities,
            timeFilter,
            setTimeFilter,
            clearActivities,
        }),
        [activities, timeFilter, clearActivities]
    );

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboardContext() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
}
