import { TaskData } from "@/components/Task/Task.types";

const STORAGE_KEY = 'vividflow_tasks';

export const getTasks = (): TaskData[] => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (!storedTasks) return [];
    
    try {
        return JSON.parse(storedTasks);
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return [];
    }
};

export const saveTasks = (tasks: TaskData[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const updateTask = (tasks: TaskData[], updatedTask: TaskData): TaskData[] => {
    const updatedTasks = tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updatedTasks);
    return updatedTasks;
};

export const deleteTask = (tasks: TaskData[], id: string): TaskData[] => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
    return updatedTasks;
};

export const addTask = (tasks: TaskData[], newTask: TaskData): TaskData[] => {
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    return updatedTasks;
};