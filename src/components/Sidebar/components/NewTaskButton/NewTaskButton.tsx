import { PlusIcon } from "@/assets/icons";
import { NewTaskButtonProps } from "./NewTaskButton.types";

import "./NewTaskButton.scss";

export default function NewTaskButton({ onClick }: NewTaskButtonProps) {
    return (
        <button className="new-task-button" onClick={onClick}>
            <PlusIcon />
            <div className="new-task-button__text">Add task</div>
        </button>
    );
}
