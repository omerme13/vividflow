import TaskHeader from "@/components/TasksHeader/TasksHeader";
import TaskList from "@/components/TasksList";

import "./Tasks.scss";

export default function Tasks() {

    return (
        <div className="tasks">
            <TaskHeader />
            <TaskList />
        </div>
    );
}
