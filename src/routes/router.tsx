import { createBrowserRouter, Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { TaskProvider } from "@/context/TaskContext";
import Tasks from "@/pages/Tasks";
import Dashboard from "@/pages/Dashboard";
import Calendar from "@/pages/Calendar";
import Settings from "@/pages/Settings";

function RootLayout() {
    return (
        <div className="app">
            <Sidebar />
            <div className="app__content">
                <Outlet />
            </div>
        </div>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "tasks",
                element: (
                    <TaskProvider>
                        <Tasks />
                    </TaskProvider>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <TaskProvider>
                        <Dashboard />
                    </TaskProvider>
                ),
            },
            {
                path: "calendar",
                element: (
                    <TaskProvider>
                        <Calendar />,
                    </TaskProvider>
                ),
            },
            {
                path: "settings",
                element: <Settings />,
            },
        ],
    },
]);
