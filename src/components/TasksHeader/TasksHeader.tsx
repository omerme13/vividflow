import { Hamburger } from "@/assets/icons";

import './TasksHeader.scss';

export default function TaskHeader() {
  return (
	<div className="task-header">
		<Hamburger />
		<input type="text" className="task-header__search-input" />
	</div>
  );
}