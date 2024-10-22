import { FC } from "react";

import PlusIcon from "@/assets/icons/plus.svg?react";

import './NewTaskButton.scss';

const NewTaskButton: FC = () => {
	return <button className="new-task-button">
		<PlusIcon />
		<div className="new-task-button__text">Add task</div>
	</button>
}
 
export default NewTaskButton;