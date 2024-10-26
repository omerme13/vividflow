import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import TasksList from "@/components/TasksList";
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";

import "./App.scss";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <div className="app">
            <Sidebar openNewTaskModal={() => setIsModalOpen(true)} />
            <TasksList />
            <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} existingLabels={[]} />
        </div>
    );
}
