import { GridIcon, KanbanIcon } from "@/assets/icons";
import { useLayout } from "@/context/LayoutContext";
import { getClassWithModifier } from "@/utils/styles";

import './LayoutToggleButton.scss';

export default function LayoutToggleButton() {
    const { layout, toggleViewMode } = useLayout();
	
    return (
        <button className="layout-toggle-button">
            <KanbanIcon
                className={getClassWithModifier("layout-toggle-button__icon", "disabled", layout.isGridViewMode)}
                onClick={toggleViewMode}
            />
            <div className="layout-toggle-button__separator" />
            <GridIcon
                className={getClassWithModifier("layout-toggle-button__icon", "disabled", !layout.isGridViewMode)}
                onClick={toggleViewMode}
            />
        </button>
    );
}
