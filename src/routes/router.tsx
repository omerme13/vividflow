import { createBrowserRouter, Outlet } from "react-router-dom";
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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <div>Route Error!</div>,
        children: [
            {
                path: "tasks",
                element: (
                    <TaskProvider>
                        <ErrorBoundary>
                            <TasksPage />
                        </ErrorBoundary>
                    </TaskProvider>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <TaskProvider>
                        <ErrorBoundary>
                            <DashboardPage />
                        </ErrorBoundary>
                    </TaskProvider>
                ),
            },
            {
                path: "calendar",
                element: (
                    <TaskProvider>
                        <CalendarProvider>
                            <ErrorBoundary>
                                <CalendarPage />
                            </ErrorBoundary>
                        </CalendarProvider>
                    </TaskProvider>
                ),
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
