import { useTaskContext } from "@/context/TaskContext";
import TaskProgressChart from "@/components/Dashboard/components/TaskProgress/TaskProgress";
import RecentActivity from "@/components/Dashboard/components/RecentActivity/RecentActivity";
import TasksOverview from "./components/TasksOverview/TasksOverview";

import "./Dashboard.scss";

export default function Dashboard() {
    const { tasks, timeFilter } = useTaskContext();

    return (
        <div className="dashboard">
            <TasksOverview tasks={tasks} timeFilter={timeFilter} />
            <TaskProgressChart tasks={tasks} timeFilter={timeFilter} />
            <RecentActivity tasks={tasks} timeFilter={timeFilter} />
        </div>
    );
}
