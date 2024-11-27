import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { addMinutes } from "date-fns";
import { CalendarViewMode } from "@/types/calendar";
import { TaskColors, TaskData } from "@/types/task";
import * as storage from "@/utils/calendarLocalStorage";
import { View } from "react-big-calendar";
import { useTaskContext } from "./TaskContext";

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
    workingHours: {
        start: number;
        end: number;
    };
    setCurrentView: (view: View) => void;
    setSelectedDate: (date: Date) => void;
}

const defaultContext: CalendarContextType = {
    events: [],
    currentView: CalendarViewMode.Month,
    selectedDate: new Date(),
    workingHours: { start: 9, end: 17 },
    setCurrentView: () => {},
    setSelectedDate: () => {},
};

const CalendarContext = createContext<CalendarContextType>(defaultContext);

export function CalendarProvider({ children }: { children: ReactNode }) {
    const { tasks } = useTaskContext();

    const storedPreferences = storage.getCalendarPreference();

    const [currentView, setCurrentView] = useState<View>(storedPreferences.currentView);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        storage.saveCalendarPreference({
            currentView,
        });
    }, [currentView]);

    const events = useMemo<CalendarEvent[]>(() => {
        return tasks
            .filter((task) => task.dueDate)
            .map((task) => ({
                id: task.id,
                title: task.text,
                start: new Date(task.dueDate!),
                end: addMinutes(new Date(task.dueDate!), 15),
                allDay: false,
                task,
                style: {
                    backgroundColor: task.color || TaskColors.Gray,
                    opacity: task.completedAt ? 0.7 : 1,
                },
            }));
    }, [tasks]);

    const value: CalendarContextType = {
        events,
        currentView,
        selectedDate,
        workingHours: storedPreferences.workingHours,
        setCurrentView,
        setSelectedDate,
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
