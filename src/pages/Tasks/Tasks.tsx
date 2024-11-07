import TaskHeader from "@/components/TasksHeader/TasksHeader";
import TaskList from "@/components/TasksList";
import { useLayout } from "@/context/LayoutContext";
import { getClassWithModifier } from "@/utils/styles";

import "./Tasks.scss";

export default function Tasks() {
    const { layout } = useLayout();

    return (
        <div className={getClassWithModifier("tasks", "compact-sidebar", layout.isCompactSidebar)}>
            <TaskHeader />
            <TaskList />
        </div>
    );
}
