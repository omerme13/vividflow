import { PlusIcon } from "@/assets/icons";
import { NewTaskButtonProps } from "./NewTaskButton.types";

import "./NewTaskButton.scss";

export default function NewTaskButton({ onClick, isCompactSidebar }: NewTaskButtonProps) {
    return (
        <button className={`new-task-button ${isCompactSidebar ? "new-task-button--compact" : ""}`} onClick={onClick}>
            <PlusIcon />
            {!isCompactSidebar && <div className="new-task-button__text">Add task</div>}
        </button>
    );
}
