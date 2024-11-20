import { useState } from "react";
import { useLayout } from "@/context/LayoutContext";
import TaskModal from "@/components/TaskModal";
import { TaskData } from "@/types/task";

export default function useTaskModal() {
    const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
    const { layout, toggleTaskModal } = useLayout();
	const [dueDate, setDueDate] = useState<Date>();

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
				dueDate={dueDate}
            />
        ),
		handleEdit,
		toggleTaskModal,
		setDueDate
    };
}
