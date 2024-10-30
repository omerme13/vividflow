import Sidebar from "@/components/Sidebar";

import Tasks from "@/pages/Tasks";
import { TaskProvider } from "./context/TaskContext";

import "./App.scss";

export default function App() {

    return (
        <div className="app">
            <Sidebar />
            <TaskProvider>
                <Tasks />
            </TaskProvider>
        </div>
    );
}
