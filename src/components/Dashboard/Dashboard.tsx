import { useTaskContext } from "@/context/TaskContext";
import TaskProgressChart from "@/components/Dashboard/components/TaskProgress/TaskProgress";
import RecentActivity from "@/components/Dashboard/components/RecentActivity/RecentActivity";
import TasksOverview from "./components/TasksOverview/TasksOverview";
import { useDashboardContext } from "@/context/DashboardContext";
import LabelDistribution from "./components/LabelDistribution/LabelDistribution";

import "./Dashboard.scss";

export default function Dashboard() {
    const { tasks } = useTaskContext();
	const { timeFilter } = useDashboardContext();

    return (
        <div className="dashboard">
            <TasksOverview tasks={tasks} timeFilter={timeFilter} />
            <TaskProgressChart tasks={tasks} timeFilter={timeFilter} />
			<LabelDistribution tasks={tasks} timeFilter={timeFilter} />
            <RecentActivity  />
        </div>
    );
}
