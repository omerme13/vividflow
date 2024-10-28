import { CalendarMode, LayoutState, Page } from "@/types/layout";
import { createContext, useContext, useEffect, useState } from "react";

const LAYOUT_STORAGE_KEY = "vivid_flow_layout";

const defaultLayoutState: LayoutState = {
    isCompactSidebar: true,
    isGridViewMode: true,
    currentPage: Page.Tasks,
    calendarMode: CalendarMode.Month,
};

interface LayoutContextType {
    layout: LayoutState;
    toggleSidebar: () => void;
    toggleViewMode: () => void;
    setCurrentPage: (page: Page) => void;
    setCalendarMode: (mode: CalendarMode) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const [layout, setLayout] = useState<LayoutState>(() => {
        const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
        return stored ? JSON.parse(stored) : defaultLayoutState;
    });

    useEffect(() => {
        localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
    }, [layout]);

    const toggleSidebar = () => {
        setLayout((prev) => ({
            ...prev,
            isCompactSidebar: !prev.isCompactSidebar,
        }));
    };

    const toggleViewMode = () => {
        setLayout((prev) => ({
            ...prev,
            isGridViewMode: !prev.isGridViewMode,
        }));
    };

    const setCurrentPage = (page: Page) => {
        setLayout((prev) => ({
            ...prev,
            currentPage: page,
        }));
    };

    const setCalendarMode = (mode: CalendarMode) => {
        setLayout((prev) => ({
            ...prev,
            calendarMode: mode,
        }));
    };

    return (
        <LayoutContext.Provider
            value={{
                layout,
                toggleSidebar,
                toggleViewMode,
                setCurrentPage,
                setCalendarMode,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
}
