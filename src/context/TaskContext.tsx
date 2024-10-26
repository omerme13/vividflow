import React, { createContext, useState, useCallback, useContext } from "react";
import { TaskData } from "@/components/Task/Task.types";
import * as taskStorage from "@/utils/taskLocalStorage";

type TaskDataWithoutId = Omit<TaskData, "id">;

interface TaskContextType {
    tasks: TaskData[];
    addTask: (task: TaskDataWithoutId) => void;
    updateTask: (task: TaskData) => void;
    deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<TaskData[]>(() => taskStorage.getTasks());

    const addTask = useCallback((newTask: TaskDataWithoutId) => {
        const taskWithId = { ...newTask, id: crypto.randomUUID() };
        setTasks((prev) => taskStorage.addTask(prev, taskWithId));
    }, []);

    const updateTask = useCallback((updatedTask: TaskData) => {
        setTasks((prev) => taskStorage.updateTask(prev, updatedTask));
    }, []);

    const deleteTask = useCallback((id: string) => {
        setTasks((prev) => taskStorage.deleteTask(prev, id));
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                updateTask,
                deleteTask,
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
