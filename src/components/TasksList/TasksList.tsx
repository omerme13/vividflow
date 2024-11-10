import Task from "@/components/Task";
import { useFilteredTasks } from "@/context/TaskContext";
import { getClassWithModifier } from "@/utils/styles";
import { useLayout } from "@/context/LayoutContext";
import useTaskModal from "@/hooks/useTaskModal";

import "./TasksList.scss";

export default function TaskList() {
    const filteredTasks = useFilteredTasks();
    const { layout } = useLayout();
    const { handleEdit, taskModal } = useTaskModal();

    return (
        <div className={getClassWithModifier("tasks-list", "list-mode", !layout.isGridViewMode)}>
            <div className="tasks-list__undone">
                {filteredTasks.incomplete.map((task) => (
                    <Task key={task.id} task={task} onEdit={() => handleEdit(task)} />
                ))}
                {taskModal}
            </div>
            <div className="tasks-list__done">
                {filteredTasks.completed.map((task) => (
                    <Task key={task.id} task={task} onEdit={() => handleEdit(task)} />
                ))}
            </div>
        </div>
    );
}
