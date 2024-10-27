import { PlusIcon } from "@/assets/icons";

import "./NewTaskButton.scss";

interface NewTaskButtonProps {
    onClick: () => void;
}

export default function NewTaskButton({ onClick }: NewTaskButtonProps) {
    return (
        <button className="new-task-button" onClick={onClick}>
            <PlusIcon />
            <div className="new-task-button__text">Add task</div>
        </button>
    );
}
