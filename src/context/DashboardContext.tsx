import { createContext, useState, useContext, Dispatch, SetStateAction, ReactNode, useMemo } from "react";
import { TimeFilter } from "@/types/dashboard";
interface DashboardContext {
    timeFilter: TimeFilter;
    setTimeFilter: Dispatch<SetStateAction<TimeFilter>>;
}

const DashboardContext = createContext<DashboardContext | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.Week);

    const value = useMemo(
        () => ({
            timeFilter,
            setTimeFilter,
        }),
        [timeFilter]
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
