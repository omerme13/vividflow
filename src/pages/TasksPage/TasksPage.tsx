import TaskHeader from "@/components/TasksHeader/TasksHeader";
import TaskList from "@/components/TasksList";

import "./TasksPage.scss";

export default function Tasks() {

    return (
        <div className="tasks-page">
            <TaskHeader />
            <TaskList />
        </div>
    );
}
