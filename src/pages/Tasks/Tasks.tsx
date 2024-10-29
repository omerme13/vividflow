import TaskModal from "@/components/TaskModal";
import TaskHeader from "@/components/TasksHeader/TasksHeader";
import TaskList from "@/components/TasksList";
import { useLayout } from "@/context/LayoutContext";

import "./Tasks.scss";

export default function Tasks() {
    const { layout, toggleTaskModal } = useLayout();

    return (
        <div className={`tasks ${layout.isCompactSidebar ? "tasks--compact-sidebar" : ""}`}>
            <TaskHeader />
            {layout.isGridViewMode ? <TaskList /> : <div />}
            {/* TODO move the modal to a general place */}
            <TaskModal isOpen={layout.isTaskModalOpen} onClose={toggleTaskModal} />
        </div>
    );
}
