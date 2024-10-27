import { createContext, useState, useCallback, useContext, Dispatch, SetStateAction, ReactNode } from "react";
import { TaskData } from "@/components/Task";
import * as taskStorage from "@/utils/taskLocalStorage";
import { extractUniqueLabels } from "@/utils/tasks";

type TaskDataWithoutId = Omit<TaskData, "id">;

interface TaskContext {
    tasks: TaskData[];
    labels: string[];
    addTask: (task: TaskDataWithoutId) => void;
    updateTask: (task: TaskData) => void;
    deleteTask: (id: string) => void;
    getTasksByLabel: (label: string) => TaskData[];
    getTaskById: (id: string) => TaskData | undefined;
}

const TaskContext = createContext<TaskContext | undefined>(undefined);

const saveTasksAndUpdateLabels = (tasks: TaskData[], setLabels: Dispatch<SetStateAction<string[]>>) => {
    taskStorage.saveTasks(tasks);
    const newLabels = extractUniqueLabels(tasks);
    setLabels(newLabels);
    taskStorage.saveLabels(newLabels);
};

export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<TaskData[]>(() => taskStorage.getTasks());
    const [labels, setLabels] = useState<string[]>(() => taskStorage.getLabels());

    const addTask = useCallback((newTask: TaskDataWithoutId) => {
        const taskWithId = { ...newTask, id: crypto.randomUUID() };
        setTasks((prev) => {
            const updatedTasks = [...prev, taskWithId];
            saveTasksAndUpdateLabels(updatedTasks, setLabels);
            return updatedTasks;
        });
    }, []);

    const updateTask = useCallback((updatedTask: TaskData) => {
        setTasks((prev) => {
            const updatedTasks = prev.map((task) => (task.id === updatedTask.id ? updatedTask : task));
            saveTasksAndUpdateLabels(updatedTasks, setLabels);
            return updatedTasks;
        });
    }, []);

    const deleteTask = useCallback((id: string) => {
        setTasks((prev) => {
            const updatedTasks = prev.filter((task) => task.id !== id);
            saveTasksAndUpdateLabels(updatedTasks, setLabels);
            return updatedTasks;
        });
    }, []);

    const getTasksByLabel = useCallback((label: string) => tasks.filter((task) => task.label === label), [tasks]);

    const getTaskById = useCallback((id: string) => tasks.find((task) => task.id === id), [tasks]);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                labels,
                addTask,
                updateTask,
                deleteTask,
                getTasksByLabel,
                getTaskById,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
}

export function useTask(id: string) {
    const { getTaskById, updateTask, deleteTask } = useTaskContext();
    const task = getTaskById(id);

    return {
        task,
        updateTask,
        deleteTask: () => deleteTask(id),
    };
}