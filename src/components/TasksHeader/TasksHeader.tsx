import { FilterIcon, SearchIcon } from "@/assets/icons";

import LayoutToggleButton from "./LayoutToggleButton";
import { useTaskContext } from "@/context/TaskContext";
import { ChangeEvent } from "react";
import Popover from "../Popover/Popover";
import Tooltip from "@/components/Tooltip";
import TasksFilters from "@/components/TasksFilters";


import "./TasksHeader.scss";

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

            <Popover
                triggerClassName="tasks-header__filter-icon"
                trigger={
                    <Tooltip content="filter">
                        <FilterIcon />
                    </Tooltip>
                }
            >
                <TasksFilters />
            </Popover>
            <LayoutToggleButton />
        </div>
    );
}
