import React, { createContext, useState, useCallback, useContext } from "react";
import initialTasks from "@/data/mockTasks.json";

import { TaskData } from "@/components/Task";

type TaskDataWithoutId = Omit<TaskData, "id">;

interface TaskContextType {
    tasks: TaskData[];
    addTask: (task: TaskDataWithoutId) => void;
    updateTask: (task: TaskData) => void;
    deleteTask: (id: string) => void;
    toggleTaskComplete: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<TaskData[]>(initialTasks as TaskData[]);

    const addTask = useCallback((newTask: TaskDataWithoutId) => {
        setTasks((prev) => [...prev, { ...newTask, id: crypto.randomUUID() }]);
    }, []);

    const updateTask = useCallback((updatedTask: TaskData) => {
        setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    }, []);

    const deleteTask = useCallback((id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }, []);

    const toggleTaskComplete = useCallback((id: string) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                updateTask,
                deleteTask,
                toggleTaskComplete,
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
