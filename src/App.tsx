import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import CardsList from "@/components/CardsList";
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";

import "./App.scss";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleSubmit = () => {};
    return (
        <div className="app">
            <Sidebar openNewTaskModal={() => setIsModalOpen(true)} />
            <CardsList />
            <NewTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                existingLabels={[]}
            />
        </div>
    );
}
