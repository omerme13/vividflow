import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import TasksList from "@/components/TasksList";
import TaskModal from "@/components/TaskModal";

import "./App.scss";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <div className="app">
            <Sidebar openNewTaskModal={() => setIsModalOpen(true)} />
            <TasksList />
            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
