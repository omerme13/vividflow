import { useState } from "react";
import { useLayout } from "@/context/LayoutContext";
import { TaskData } from "@/components/Task";
import TaskModal from "@/components/TaskModal";

export default function useTaskModal() {
    const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
    const { layout, toggleTaskModal } = useLayout();

    const handleEdit = (task: TaskData) => {
        setSelectedTask(task);
        toggleTaskModal();
    };

    const handleClose = () => {
        toggleTaskModal();
        setSelectedTask(null);
    };
    return {
        taskModal: (
            <TaskModal
                isOpen={layout.isTaskModalOpen}
                onClose={handleClose}
                isEditMode={!!selectedTask}
                task={selectedTask || undefined}
            />
        ),
		handleEdit
    };
}
