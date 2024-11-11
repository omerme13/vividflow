import Task, { TaskData } from "@/components/Task";
import { useFilteredTasks } from "@/context/TaskContext";
import { getClassWithModifier } from "@/utils/styles";
import { useLayout } from "@/context/LayoutContext";
import useTaskModal from "@/hooks/useTaskModal";
import { EmptyTasksIcon, NotFoundTasksIcon } from "@/assets/icons";
import FeedbackState from "../FeedbackState/FeedbackState";

import "./TasksList.scss";

export default function TaskList() {
    const { incomplete, completed, tasksExist, all } = useFilteredTasks();
    const { layout } = useLayout();
    const { handleEdit, taskModal } = useTaskModal();

    const renderTasks = (tasks: TaskData[], className: string) =>
        tasks.length > 0 && (
            <div className={className}>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} onEdit={() => handleEdit(task)} />
                ))}
            </div>
        );

    return (
        <div className={getClassWithModifier("tasks-list", "list-mode", !layout.isGridViewMode)}>
            {taskModal}
            {renderTasks(incomplete, "tasks-list__undone")}
            {renderTasks(completed, "tasks-list__done")}
            {!tasksExist && (
                <FeedbackState
                    icon={EmptyTasksIcon}
                    title="You don't have any tasks yet"
                    description={`Click the "add task" button to add a task`}
                />
            )}
            {tasksExist && all.length === 0 && (
                <FeedbackState icon={NotFoundTasksIcon} title="No matching tasks found" />
            )}
        </div>
    );
}
