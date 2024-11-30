import { createContext, useState, useContext, ReactNode, useMemo } from "react";
import { TimeFilter } from "@/types/dashboard";
import * as storage from "@/utils/dashboardLocalStorage";

interface DashboardContext {
    timeFilter: TimeFilter;
    updateTimeFilter: (newTimeFilter: TimeFilter) => void;
}

const DashboardContext = createContext<DashboardContext | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(storage.getTimeFilters());

	const updateTimeFilter = (newTimeFilter: TimeFilter) => {
		setTimeFilter(newTimeFilter);
		storage.saveTimeFilter(newTimeFilter);
	}

    const value = useMemo(
        () => ({
            timeFilter,
            updateTimeFilter,
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
