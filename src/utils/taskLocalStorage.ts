import { extractUniqueLabels } from "./tasks";
import { StorageKeys } from "./constants";
import { TaskData } from "@/types/task";

export const getTasks = (): TaskData[] => {
    const storedTasks = localStorage.getItem(StorageKeys.Tasks);
    if (!storedTasks) return [];
    
    try {
        return JSON.parse(storedTasks);
    } catch {
        localStorage.removeItem(StorageKeys.Tasks);
        return [];
    }
};

export const getLabels = (): string[] => {
    const storedLabels = localStorage.getItem(StorageKeys.Labels);
    if (!storedLabels) {
        const tasks = getTasks();
		const labels = extractUniqueLabels(tasks);
        saveLabels(labels);
        return labels;
    }
    
    try {
        return JSON.parse(storedLabels);
    } catch {
        return [];
    }
};

export const saveTasks = (tasks: TaskData[]): void => {
    localStorage.setItem(StorageKeys.Tasks, JSON.stringify(tasks));
};

export const saveLabels = (labels: string[]): void => {
    localStorage.setItem(StorageKeys.Labels, JSON.stringify(labels));
};