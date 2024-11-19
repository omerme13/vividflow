import { createContext, useState, useCallback, useContext, Dispatch, SetStateAction, ReactNode, useMemo } from "react";
import { TaskColors, TaskData } from "@/components/Task";
import * as taskStorage from "@/utils/taskLocalStorage";
import { extractUniqueLabels } from "@/utils/tasks";
import useDebouncedValue from "@/hooks/useDebouncedValue";

type TaskDataWithoutId = Omit<TaskData, "id">;

interface FilterOptions {
    selectedLabels: string[];
    selectedColors: TaskColors[];
}

interface DeletedTaskInfo {
    [taskId: string]: {
        task: TaskData;
        index: number;
    };
}

interface TaskContext {
    tasks: TaskData[];
    labels: string[];
    searchQuery: string;
    filterOptions: FilterOptions;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    setFilterOptions: Dispatch<SetStateAction<FilterOptions>>;
    addTask: (task: TaskDataWithoutId) => void;
    updateTask: (task: TaskData) => void;
    deleteTask: (id: string) => void;
    getTasksByLabel: (label: string) => TaskData[];
    getTaskById: (id: string) => TaskData | undefined;
    clearFilters: () => void;
    clearColorFilters: () => void;
    hasFilters: () => boolean;
    filterByLabel: (label: string) => void;
    toggleTaskCompletion: (id: string) => void;
    setTaskDueDate: (id: string, date: Date | undefined) => void;
    restoreTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContext | undefined>(undefined);

const saveTasksAndUpdateLabels = (tasks: TaskData[], setLabels: Dispatch<SetStateAction<string[]>>) => {
    taskStorage.saveTasks(tasks);
    const newLabels = extractUniqueLabels(tasks);
    setLabels(newLabels);
    taskStorage.saveLabels(newLabels);
};

const initialFilterOptions: FilterOptions = {
    selectedLabels: [],
    selectedColors: [],
};

export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<TaskData[]>(() => taskStorage.getTasks());
    const [labels, setLabels] = useState<string[]>(() => taskStorage.getLabels());
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilterOptions);
    const [, setLastDeletedTaskInfo] = useState<DeletedTaskInfo | null>(null);

    const addTask = useCallback((newTask: TaskDataWithoutId) => {
        const taskWithId = { ...newTask, isCompleted: false, id: crypto.randomUUID() };
        setTasks((prev) => {
            const updatedTasks = [taskWithId, ...prev];
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
            const taskIndex = prev.findIndex((task) => task.id === id);
            const deletedTask = prev[taskIndex];
            const updatedTasks = prev.filter((task) => task.id !== id);

            saveTasksAndUpdateLabels(updatedTasks, setLabels);

            if (deletedTask) {
                setLastDeletedTaskInfo((prevDeleted) => ({
                    ...(prevDeleted || {}),
                    [deletedTask.id]: { task: deletedTask, index: taskIndex },
                }));
            }

            return updatedTasks;
        });
    }, []);

    const restoreTask = useCallback((id: string) => {
        setLastDeletedTaskInfo((prevDeleted) => {
            if (!prevDeleted || !prevDeleted[id]) return prevDeleted;

            const { task, index } = prevDeleted[id];

            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks];
                const restoredIndex = Math.min(index, updatedTasks.length);
                updatedTasks.splice(restoredIndex, 0, task);
                saveTasksAndUpdateLabels(updatedTasks, setLabels);
                return updatedTasks;
            });

            const remainingTasks = { ...prevDeleted };
            delete remainingTasks[id];
            return Object.keys(remainingTasks).length > 0 ? remainingTasks : null;
        });
    }, []);

    const getTasksByLabel = useCallback((label: string) => tasks.filter((task) => task.label === label), [tasks]);

    const getTaskById = useCallback((id: string) => tasks.find((task) => task.id === id), [tasks]);

    const clearFilters = useCallback(() => {
        setFilterOptions(initialFilterOptions);
        setSearchQuery("");
    }, []);

    const clearColorFilters = useCallback(() => {
        setFilterOptions((prev) => ({ ...prev, selectedColors: initialFilterOptions.selectedColors }));
    }, []);

    const hasFilters = useCallback(
        () => !!filterOptions.selectedColors.length || !!filterOptions.selectedLabels.length,
        [filterOptions]
    );

    const filterByLabel = useCallback(
        (label: string) => {
            setFilterOptions((prev) => ({
                ...prev,
                selectedLabels:
                    filterOptions.selectedLabels.length === 1 && filterOptions.selectedLabels[0] === label
                        ? []
                        : [label],
            }));
        },
        [filterOptions]
    );

    const toggleTaskCompletion = useCallback((id: string) => {
        setTasks((prev) => {
            const updatedTasks = prev.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          isCompleted: !task.isCompleted,
                          completedAt: !task.isCompleted ? new Date() : undefined,
                      }
                    : task
            );

            taskStorage.saveTasks(updatedTasks);
            return updatedTasks;
        });
    }, []);

    const setTaskDueDate = useCallback((id: string, date: Date | undefined) => {
        setTasks((prev) => {
            const updatedTasks = prev.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          dueDate: date,
                      }
                    : task
            );

            taskStorage.saveTasks(updatedTasks);
            return updatedTasks;
        });
    }, []);

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
                searchQuery,
                setSearchQuery,
                filterOptions,
                setFilterOptions,
                clearFilters,
                clearColorFilters,
                hasFilters,
                filterByLabel,
                toggleTaskCompletion,
                setTaskDueDate,
                restoreTask,
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
    const { getTaskById, updateTask, deleteTask, filterByLabel, toggleTaskCompletion, setTaskDueDate, restoreTask } =
        useTaskContext();
    const task = getTaskById(id);

    if (!task) {
        throw new Error(`Task with id ${id} not found`);
    }

    return {
        task,
        updateTask,
        deleteTask: () => deleteTask(id),
        filterByLabel: () => filterByLabel(task.label || ""),
        toggleTaskCompletion: () => toggleTaskCompletion(id),
        setTaskDueDate: (date: Date | undefined) => setTaskDueDate(id, date),
        restoreTask: () => restoreTask(task.id),
    };
}

export function useFilteredTasks() {
    const { tasks, searchQuery, filterOptions } = useTaskContext();
    const debouncedSearchQuery = useDebouncedValue<string>(searchQuery);
    const { selectedLabels, selectedColors } = filterOptions;

    return useMemo(() => {
        const normalizedQuery = debouncedSearchQuery.toLowerCase();

        const filterConditions: Array<(task: TaskData) => boolean> = [
            (task) =>
                normalizedQuery === "" ||
                task.text.toLowerCase().includes(normalizedQuery) ||
                (task.label?.toLowerCase() || "").includes(normalizedQuery),
            (task) => selectedLabels.length === 0 || !!(task.label && selectedLabels.includes(task.label)),
            (task) => selectedColors.length === 0 || !!(task.color && selectedColors.includes(task.color)),
        ];

        const filteredTasks = tasks.filter((task) => filterConditions.every((condition) => condition(task)));

        return {
            completed: filteredTasks.filter((task) => task.isCompleted),
            incomplete: filteredTasks.filter((task) => !task.isCompleted),
            all: filteredTasks,
            tasksExist: !!tasks.length,
        };
    }, [tasks, debouncedSearchQuery, selectedLabels, selectedColors]);
}
