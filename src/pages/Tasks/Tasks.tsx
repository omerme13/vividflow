import TaskModal from "@/components/TaskModal";
import TaskHeader from "@/components/TasksHeader/TasksHeader";
import TaskList from "@/components/TasksList";
import { useLayout } from "@/context/LayoutContext";

import './Tasks.scss';

export default function Tasks() {
    const { layout, toggleTaskModal } = useLayout();
	
    return (
        <div className="tasks">
            <TaskHeader />
            <TaskList />
			{/* TODO move the modal to a general place */}
            <TaskModal isOpen={layout.isTaskModalOpen} onClose={toggleTaskModal} />
        </div>
    );
}
