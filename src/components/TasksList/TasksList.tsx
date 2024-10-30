import { useState } from "react";
import TaskModal from "@/components/TaskModal";
import Task from "@/components/Task";
import { TaskData } from "@/components/Task/Task.types";
import { useTaskContext } from "@/context/TaskContext";
import { useLayout } from "@/context/LayoutContext";

import "./TasksList.scss";

export default function TaskList() {
    const { tasks } = useTaskContext();
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

    return (
        <div className="tasks-list">
            {tasks.map((task) => (
                <Task key={task.id} task={task} onEdit={() => handleEdit(task)} />
            ))}

            <TaskModal
                isOpen={layout.isTaskModalOpen}
                onClose={handleClose}
                isEditMode={!!selectedTask}
                task={selectedTask || undefined}
            />
        </div>
    );
}
