import { FC } from "react";

import PlusIcon from "@/assets/icons/plus.svg?react";

import "./NewTaskButton.scss";

interface NewTaskButtonProps {
	onClick: () => void;
}

const NewTaskButton: FC<NewTaskButtonProps> = ({ onClick }) => {
    return (
        <button className="new-task-button" onClick={onClick}>
            <PlusIcon />
            <div className="new-task-button__text">Add task</div>
        </button>
    );
};

export default NewTaskButton;
