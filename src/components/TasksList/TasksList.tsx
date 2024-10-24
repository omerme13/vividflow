import { useState } from "react";
import tasksData from "@/data/mockTasks.json";
import { generateUniqueId } from "@/utils/helpers";
import Task from "./components/Task";
import { TaskData } from './components/Task.types';

import "./TasksList.scss";

export default function TaskList() {
    const [tasks, setTasks] = useState(tasksData);

    const deleteTask = (id: string) => setTasks((prevData) => prevData.filter((task) => task.id !== id));

    return (
        <div className="tasks-list">
            {(tasks as TaskData[]).map((task) => (
                <Task key={generateUniqueId()} task={task} deleteTask={deleteTask} />
            ))}
        </div>
    );
}
