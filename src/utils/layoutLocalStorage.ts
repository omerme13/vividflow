import { LayoutState } from "@/types/layout";
import { DEFAULT_LAYOUT, StorageKeys } from "./constants";



export const getStoredLayout = (): LayoutState => {
    const storedLayout = localStorage.getItem(StorageKeys.Layout);
    if (!storedLayout) return DEFAULT_LAYOUT;

    try {
        const parsedLayout = JSON.parse(storedLayout) as Partial<LayoutState>;
        return { ...DEFAULT_LAYOUT, ...parsedLayout };
    } catch {
        return DEFAULT_LAYOUT;
    }
};

export const updateLayout = (newLayout: Partial<LayoutState>): LayoutState => {
    const updatedLayout = {
        ...getStoredLayout(),
        ...newLayout,
    };
    localStorage.setItem(StorageKeys.Layout, JSON.stringify(updatedLayout));
    return updatedLayout;
};

export const clearLayout = (): void => {
    localStorage.removeItem(StorageKeys.Layout);
};
