import { SearchIcon } from "@/assets/icons";

import "./TasksHeader.scss";
import LayoutToggleButton from "./LayoutToggleButton";
import { useTaskContext } from "@/context/TaskContext";
import { ChangeEvent } from "react";

export default function TasksHeader() {
    const { searchQuery, setSearchQuery } = useTaskContext();
	
    return (
        <div className="tasks-header">
            <div className="tasks-header__search-input-container">
                <SearchIcon className="tasks-header__search-button" />
                <input
                    type="text"
                    className="tasks-header__search-input"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
            </div>
            <LayoutToggleButton />
        </div>
    );
}
