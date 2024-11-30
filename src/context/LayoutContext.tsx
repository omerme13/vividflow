import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Breakpoint, LayoutState, Page } from "@/types/layout";
import { StorageKeys } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";

const defaultLayoutState: LayoutState = {
    isCompactSidebar: false,
    isGridViewMode: true,
	isTaskModalOpen: false
};

interface LayoutContextType {
    layout: LayoutState;
    toggleSidebar: () => void;
    toggleViewMode: () => void;
    setCurrentPage: (page: Page) => void;
	toggleTaskModal: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const [layout, setLayout] = useState<LayoutState>(() => {
        const stored = localStorage.getItem(StorageKeys.Layout);
        return stored ? JSON.parse(stored) : defaultLayoutState;
    });
	const isBelowM = useBreakpoint(Breakpoint.m);


    useEffect(() => {
        localStorage.setItem(StorageKeys.Layout, JSON.stringify(layout));
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

	const toggleTaskModal = () => {
        setLayout((prev) => ({
            ...prev,
            isTaskModalOpen: !prev.isTaskModalOpen,
        }));
    };

    return (
        <LayoutContext.Provider
            value={{
                layout: {
					...layout,
					isCompactSidebar: isBelowM || layout.isCompactSidebar
				},
                toggleSidebar,
                toggleViewMode,
                setCurrentPage,
				toggleTaskModal
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
