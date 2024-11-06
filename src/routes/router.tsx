import { createBrowserRouter, Outlet } from "react-router-dom";
import Tasks from "@/pages/Tasks";
import Sidebar from "@/components/Sidebar";
import { TaskProvider } from "@/context/TaskContext";

function RootLayout() {
    return (
        <div className="app">
            <Sidebar />
            <Outlet />
        </div>
    );
}

function TasksPage() {
    return (
        <TaskProvider>
            <Tasks />
        </TaskProvider>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "tasks",
                element: <TasksPage />,
            },
        ],
    },
]);
