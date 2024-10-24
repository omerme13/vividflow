import { FC, useState } from "react";

import "./App.scss";
import Sidebar from "@/components/Sidebar";
import CardsList from "@/components/CardsList";
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";

const App: FC = () => {
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
};

export default App;
