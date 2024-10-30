import TaskHeader from "@/components/TasksHeader/TasksHeader";
import TaskList from "@/components/TasksList";
import { useLayout } from "@/context/LayoutContext";

import "./Tasks.scss";

export default function Tasks() {
    const { layout } = useLayout();

    return (
        <div className={`tasks ${layout.isCompactSidebar ? "tasks--compact-sidebar" : ""}`}>
            <TaskHeader />
            {layout.isGridViewMode ? <TaskList /> : <div />}
        </div>
    );
}
