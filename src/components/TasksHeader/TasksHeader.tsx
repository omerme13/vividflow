import { FilterIcon, FilterOffIcon, SearchIcon } from "@/assets/icons";
import LayoutToggleButton from "./LayoutToggleButton";
import { useTaskContext } from "@/context/TaskContext";
import { ChangeEvent } from "react";
import Tooltip from "@/components/Tooltip";
import TasksFilters from "@/components/TasksFilters";
import Popover from "@/components/Popover";

import "./TasksHeader.scss";

export default function TasksHeader() {
    const { searchQuery, setSearchQuery, clearFilters, hasFilters } = useTaskContext();

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

            <div className="tasks-header__filter-buttons">
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
                {hasFilters() && (
                    <Tooltip content="remove filters">
                        <button className="tasks-header__filter-off-icon" onClick={clearFilters}>
                            <FilterOffIcon />
                        </button>
                    </Tooltip>
                )}
            </div>
            <LayoutToggleButton />
        </div>
    );
}
