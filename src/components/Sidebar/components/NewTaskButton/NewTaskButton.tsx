import { PlusIcon } from "@/assets/icons";
import { NewTaskButtonProps } from "./NewTaskButton.types";

import "./NewTaskButton.scss";
import Tooltip from "@/components/Tooltip";

export default function NewTaskButton({ onClick, isCompactSidebar }: NewTaskButtonProps) {
    return (
        <Tooltip content={isCompactSidebar ? "add new task" : ""}>
            <button
                className={`new-task-button ${isCompactSidebar ? "new-task-button--compact" : ""}`}
                onClick={onClick}
            >
                <PlusIcon />
                {!isCompactSidebar && <div className="new-task-button__text">Add task</div>}
            </button>
        </Tooltip>
    );
}
