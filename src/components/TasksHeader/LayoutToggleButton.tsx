import { GridIcon, KanbanIcon } from "@/assets/icons";
import { useLayout } from "@/context/LayoutContext";
import { getClassWithModifier } from "@/utils/styles";

import "./LayoutToggleButton.scss";
import Tooltip from "../Tooltip";

export default function LayoutToggleButton() {
    const { layout, toggleViewMode } = useLayout();

    return (
        <button className="layout-toggle-button">
            <Tooltip content="grid mode">
                <GridIcon
                    className={getClassWithModifier("layout-toggle-button__icon", "disabled", !layout.isGridViewMode)}
                    onClick={toggleViewMode}
                />
            </Tooltip>
            <div className="layout-toggle-button__separator" />
            <Tooltip content="kanban mode">
                <KanbanIcon
                    className={getClassWithModifier("layout-toggle-button__icon", "disabled", layout.isGridViewMode)}
                    onClick={toggleViewMode}
                />
            </Tooltip>
        </button>
    );
}
