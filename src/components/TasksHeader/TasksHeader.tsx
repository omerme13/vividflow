import { FilterIcon, SearchIcon, CloseIcon, PlusIcon } from "@/assets/icons";
import LayoutToggleButton from "./LayoutToggleButton";
import { useTaskContext } from "@/context/TaskContext";
import { ChangeEvent } from "react";
import Tooltip from "@/components/Tooltip";
import TasksFilters from "@/components/TasksFilters";
import Popover from "@/components/Popover";
import useTaskModal from "@/hooks/useTaskModal";
import useScroll from "@/hooks/useScroll";

import "./TasksHeader.scss";
import { getClassWithModifier } from "@/utils/styles";

export default function TasksHeader() {
    const { searchQuery, setSearchQuery, clearFilters, hasFilters } = useTaskContext();
    const isHasFilters = hasFilters();
    const { toggleTaskModal } = useTaskModal();
    const isScrolled = useScroll(30);

    return (
        <div className={getClassWithModifier("tasks-header", "scrolled", isScrolled)}>
            <button className="tasks-header__add-task-button" onClick={toggleTaskModal}>
                <PlusIcon />
                <div className="tasks-header__add-task-button-text">Add task</div>
            </button>
            <div className="tasks-header__search-input-container">
                <SearchIcon className={getClassWithModifier("tasks-header__search-icon", "active", !!searchQuery)} />
                {searchQuery && (
                    <CloseIcon
                        className="tasks-header__clear-text"
                        width={18}
                        height={18}
                        onClick={() => setSearchQuery("")}
                    />
                )}
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
                    triggerClassName={getClassWithModifier("tasks-header__filter-icon", "active", isHasFilters)}
                    trigger={
                        <Tooltip content="filter">
                            <FilterIcon />
                        </Tooltip>
                    }
                >
                    <TasksFilters />
                </Popover>
                {isHasFilters && (
                    <Tooltip content="remove filters">
                        <button className="tasks-header__filter-off-icon" onClick={clearFilters}>
                            <CloseIcon width={16} height={16} />
                        </button>
                    </Tooltip>
                )}
            </div>
            <LayoutToggleButton />
        </div>
    );
}
