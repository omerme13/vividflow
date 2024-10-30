import {  SearchIcon } from "@/assets/icons";

import "./TasksHeader.scss";
import LayoutToggleButton from "./LayoutToggleButton";

export default function TasksHeader() {

    return (
        <div className="tasks-header">
            <div className="tasks-header__search-input-container">
                <SearchIcon className="tasks-header__search-button" />
                <input type="text" className="tasks-header__search-input" placeholder="Search" />
            </div>
			<LayoutToggleButton />
        </div>
    );
}
