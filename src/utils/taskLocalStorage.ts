import { TaskData } from "@/components/Task";

const TASKS_KEY = 'vividflow_tasks';
const LABELS_KEY = 'vividflow_labels';

export const getTasks = (): TaskData[] => {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    if (!storedTasks) return [];
    
    try {
        return JSON.parse(storedTasks);
    } catch {
        localStorage.removeItem(TASKS_KEY);
        return [];
    }
};

export const getLabels = (): string[] => {
    const storedLabels = localStorage.getItem(LABELS_KEY);
    if (!storedLabels) {
        const tasks = getTasks();
        const labels = Array.from(new Set(tasks.map(task => task.label).filter(Boolean)));
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
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const saveLabels = (labels: string[]): void => {
    localStorage.setItem(LABELS_KEY, JSON.stringify(labels));
};