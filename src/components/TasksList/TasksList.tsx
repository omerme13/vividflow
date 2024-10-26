import Task, { TaskData } from "@/components/Task";

import "./TasksList.scss";
import { useTaskContext } from "@/context/TaskContext";

export default function TaskList() {
	const { tasks } = useTaskContext();
	
    return (
        <div className="tasks-list">
            {(tasks as TaskData[]).map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
}
