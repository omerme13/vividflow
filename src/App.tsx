import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import TasksList from "@/components/TasksList";
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";
import { TaskProvider } from "./context/TaskContext";

import "./App.scss";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleSubmit = () => {};
    return (
        <div className="app">
            <TaskProvider>
                <Sidebar openNewTaskModal={() => setIsModalOpen(true)} />
                <TasksList />
                <NewTaskModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    existingLabels={[]}
                />
            </TaskProvider>
        </div>
    );
}
