import Sidebar from "@/components/Sidebar";

import Tasks from "@/pages/Tasks";
import { useLayout } from "@/context/LayoutContext";

import "./App.scss";

export default function App() {
    const { toggleTaskModal } = useLayout();
	
    return (
        <div className="app">
            <Sidebar openNewTaskModal={toggleTaskModal} />
			<Tasks />
        </div>
    );
}
