import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { TaskProvider } from "@/context/TaskContext";
import TasksPage from "@/pages/TasksPage";
import DashboardPage from "@/pages/DashboardPage";
import CalendarPage from "@/pages/CalendarPage";
import SettingsPage from "@/pages/SettingsPage";
import { useLayout } from "@/context/LayoutContext";
import { getClassWithModifier } from "@/utils/styles";
import { CalendarProvider } from "@/context/CalendarContext";
import ErrorBoundary from "@/components/ErrorBoundary";

function RootLayout() {
    const { layout } = useLayout();

    return (
        <ErrorBoundary>
            <div className="app">
                <Sidebar />
                <div className={getClassWithModifier("app__content", "compact-sidebar", layout.isCompactSidebar)}>
                    <Outlet />
                </div>
            </div>
        </ErrorBoundary>
    );
}

function TaskEnabledLayout() {
    return (
        <TaskProvider>
            <Outlet />
        </TaskProvider>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <div>Route Error!</div>,
        children: [
            {
                index: true,
                element: <Navigate to="tasks" replace />,
            },
            {
                element: <TaskEnabledLayout />,
                children: [
                    {
                        path: "tasks",
                        element: (
                            <ErrorBoundary>
                                <TasksPage />
                            </ErrorBoundary>
                        ),
                    },
                    {
                        path: "dashboard",
                        element: (
                            <ErrorBoundary>
                                <DashboardPage />
                            </ErrorBoundary>
                        ),
                    },
                    {
                        path: "calendar",
                        element: (
                            <CalendarProvider>
                                <ErrorBoundary>
                                    <CalendarPage />
                                </ErrorBoundary>
                            </CalendarProvider>
                        ),
                    },
                ],
            },
            {
                path: "settings",
                element: (
                    <ErrorBoundary>
                        <SettingsPage />
                    </ErrorBoundary>
                ),
            },
        ],
    },
]);
