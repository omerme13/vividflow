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

function RootLayout() {
    const { layout } = useLayout();

    return (
        <div className="app">
            <Sidebar />
            <div className={getClassWithModifier("app__content", "compact-sidebar", layout.isCompactSidebar)}>
                <Outlet />
            </div>
        </div>
    );
}

// TODO add ErrorBoundary to the routes
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "tasks",
                element: (
                    <TaskProvider>
                        <TasksPage />
                    </TaskProvider>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <TaskProvider>
                        <DashboardPage />
                    </TaskProvider>
                ),
            },
            {
                path: "calendar",
                element: (
                    <TaskProvider>
                        <CalendarProvider>
                            <CalendarPage />,
                        </CalendarProvider>
                    </TaskProvider>
                ),
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
        ],
    },
]);
