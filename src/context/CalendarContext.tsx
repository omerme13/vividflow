import { createContext, useContext, useMemo, useState, useEffect, ReactNode } from "react";
import { addDays, addMinutes, isBefore, isSameDay } from "date-fns";
import { useTaskContext } from "./TaskContext";
import { getCalendarPreference, saveCalendarPreference } from "@/utils/calendarLocalStorage";
import { TaskData, TaskColors } from "@/components/Task";
import { View } from "react-big-calendar";

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    task: TaskData;
    style: {
        backgroundColor: TaskColors | string;
        opacity: number;
    };
}

interface CalendarContextType {
    events: CalendarEvent[];
    currentView: View;
    selectedDate: Date;
    filterCompleted: boolean;
    selectedLabels: string[];
    uniqueLabels: string[];
    workingHours: {
        start: number;
        end: number;
    };
    setCurrentView: (view: View) => void;
    setSelectedDate: (date: Date) => void;
    setFilterCompleted: (completed: boolean) => void;
    toggleLabel: (label: string) => void;
    resetFilters: () => void;
    getDueTasks: (days?: number) => CalendarEvent[];
    getOverdueTasks: () => CalendarEvent[];
    toggleTaskComplete: (eventId: string) => Promise<void>;
    getEventsForDay: (date: Date) => CalendarEvent[];
    navigateToDate: (date: Date) => void;
    navigateToTask: (taskId: string) => void;
    updateWorkingHours: (start: number, end: number) => void;
}

const defaultContext: CalendarContextType = {
    events: [],
    currentView: "month",
    selectedDate: new Date(),
    filterCompleted: true,
    selectedLabels: [],
    uniqueLabels: [],
    workingHours: { start: 9, end: 17 },
    setCurrentView: () => {},
    setSelectedDate: () => {},
    setFilterCompleted: () => {},
    toggleLabel: () => {},
    resetFilters: () => {},
    getDueTasks: () => [],
    getOverdueTasks: () => [],
    toggleTaskComplete: async () => {},
    getEventsForDay: () => [],
    navigateToDate: () => {},
    navigateToTask: () => {},
    updateWorkingHours: () => {},
};

const CalendarContext = createContext<CalendarContextType>(defaultContext);

export function CalendarProvider({ children }: { children: ReactNode }) {
    const { tasks } = useTaskContext();
    const { updateTask } = useTaskContext();

    const storedPreferences = getCalendarPreference();

    const [currentView, setCurrentView] = useState<View>(storedPreferences.currentView);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [filterCompleted, setFilterCompleted] = useState(storedPreferences.filterCompleted);
    const [selectedLabels, setSelectedLabels] = useState<string[]>(storedPreferences.selectedLabels);

    useEffect(() => {
        saveCalendarPreference({
            currentView,
            filterCompleted,
            selectedLabels,
        });
    }, [currentView, filterCompleted, selectedLabels]);

    const events = useMemo<CalendarEvent[]>(() => {
        return tasks
            .filter((task) => task.dueDate)
            .filter((task) => selectedLabels.length === 0 || selectedLabels.includes(task.label || ""))
            .map((task) => ({
                id: task.id,
                title: task.text,
                start: new Date(task.dueDate!),
				end: addMinutes(new Date(task.dueDate!), 15),
                allDay: false,
                task,
                style: {
                    backgroundColor: task.color || TaskColors.Gray,
                    opacity: task.isCompleted ? 0.7 : 1,
                },
            }));
    }, [tasks, selectedLabels]);

    const uniqueLabels = useMemo<string[]>(() => {
        return [...new Set(tasks.map((task) => task.label))].filter(Boolean);
    }, [tasks]);

    const getDueTasks = (days = 7): CalendarEvent[] => {
        const cutoff = addDays(new Date(), days);
        return events.filter((event) => isBefore(event.start, cutoff) && !event.task.isCompleted);
    };

    const getOverdueTasks = (): CalendarEvent[] => {
        const now = new Date();
        return events.filter((event) => isBefore(event.start, now) && !event.task.isCompleted);
    };

    const toggleTaskComplete = async (eventId: string): Promise<void> => {
        const task = tasks.find((t) => t.id === eventId);
        if (task) {
            const updatedTask: TaskData = {
                ...task,
                isCompleted: !task.isCompleted,
                completedAt: !task.isCompleted ? new Date() : undefined,
            };
            updateTask(updatedTask);
        }
    };

    const getEventsForDay = (date: Date): CalendarEvent[] => {
        return events.filter((event) => isSameDay(event.start, date));
    };

    const navigateToDate = (date: Date): void => {
        setSelectedDate(date);
    };

    const navigateToTask = (taskId: string): void => {
        const task = tasks.find((t) => t.id === taskId);
        if (task?.dueDate) {
            setSelectedDate(new Date(task.dueDate));
            setCurrentView("day");
        }
    };

    const toggleLabel = (label: string): void => {
        setSelectedLabels((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));
    };

    const resetFilters = (): void => {
        setFilterCompleted(true);
        setSelectedLabels([]);
    };

    const updateWorkingHours = (start: number, end: number): void => {
        saveCalendarPreference({
            workingHours: { start, end },
        });
    };

    const value: CalendarContextType = {
        events,
        currentView,
        selectedDate,
        filterCompleted,
        selectedLabels,
        uniqueLabels,
        workingHours: storedPreferences.workingHours,
        setCurrentView,
        setSelectedDate,
        setFilterCompleted,
        toggleLabel,
        resetFilters,
        getDueTasks,
        getOverdueTasks,
        toggleTaskComplete,
        getEventsForDay,
        navigateToDate,
        navigateToTask,
        updateWorkingHours,
    };

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendar(): CalendarContextType {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendar must be used within a CalendarProvider");
    }
    return context;
}
