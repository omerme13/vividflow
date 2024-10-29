import { PlusIcon } from "@/assets/icons";
import { NewTaskButtonProps } from "./NewTaskButton.types";

import "./NewTaskButton.scss";

export default function NewTaskButton({ onClick, isCompactSidebar }: NewTaskButtonProps) {
    return isCompactSidebar ? (
        <button className="new-task-button--compact" onClick={onClick}>
            <PlusIcon />
        </button>
    ) : (
        <button className="new-task-button" onClick={onClick}>
            <PlusIcon />
            <div className="new-task-button__text">Add task</div>
        </button>
    );
}
