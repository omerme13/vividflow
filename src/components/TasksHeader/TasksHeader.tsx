import { GridIcon, HamburgerIcon, KanbanIcon, SearchIcon } from "@/assets/icons";
import { useLayout } from "@/context/LayoutContext";

import "./TasksHeader.scss";

export default function TasksHeader() {
    const { layout, toggleViewMode, toggleSidebar } = useLayout();

    return (
        <div className="tasks-header">
            <HamburgerIcon className="tasks-header__menu-button" onClick={toggleSidebar} />
            <div className="tasks-header__search-input-container">
                <SearchIcon className="tasks-header__search-button" />
                <input type="text" className="tasks-header__search-input" placeholder="Search" />
            </div>
            <button className="tasks-header__layout-toggle-button">
                <KanbanIcon
                    className={`tasks-header__layout-toggle-button-icon ${
                        layout.isGridViewMode ? "tasks-header__layout-toggle-button-icon--not-selected" : ""
                    }`}
                    onClick={toggleViewMode}
                />
                <div className="tasks-header__layout-toggle-button-separator" />
                <GridIcon
                    className={`tasks-header__layout-toggle-button-icon ${
                        layout.isGridViewMode ? "" : "tasks-header__layout-toggle-button-icon--not-selected"
                    }`}
                    onClick={toggleViewMode}
                />
            </button>
        </div>
    );
}
