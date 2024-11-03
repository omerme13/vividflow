import Select from "react-select";
import { useTaskContext } from "@/context/TaskContext";
import { TaskColors } from "@/components/Task";
import { getPaletteColor } from "@/utils/styles";

import "./TasksFilters.scss";

const TaskFilter = () => {
    const { labels, filterOptions, setFilterOptions, clearColorFilters } = useTaskContext();

    const labelOptions = labels.map((label) => ({
        value: label,
        label: label,
    }));

    return (
        <div className="tasks-filters">
            <div className="tasks-filters__section">
                <h3 className="tasks-filters__title">Labels</h3>
                <Select
                    isMulti
                    options={labelOptions}
                    value={labelOptions.filter((option) => filterOptions.selectedLabels.includes(option.value))}
                    onChange={(selected) => {
                        setFilterOptions((prev) => ({
                            ...prev,
                            selectedLabels: selected ? selected.map((option) => option.value) : [],
                        }));
                    }}
                    placeholder="Select labels"
                    className="tasks-filters__select"
                    classNamePrefix="tasks-filters-select"
                    classNames={{ menuList: () => "scrollbar" }}
                />
            </div>

            <div className="tasks-filters__section">
                <h3 className="tasks-filters__title">Colors</h3>
                <div className="tasks-filters__colors-palette">
                    {Object.values(TaskColors).map((color: TaskColors) => (
                        <div key={color} className="tasks-filters__color-item">
                            <input
                                type="checkbox"
                                id={`color-${color}`}
                                className="tasks-filters__color-checkbox"
                                checked={filterOptions.selectedColors.includes(color)}
                                onChange={() => {
                                    setFilterOptions((prev) => ({
                                        ...prev,
                                        selectedColors: prev.selectedColors.includes(color)
                                            ? prev.selectedColors.filter((c) => c !== color)
                                            : [...prev.selectedColors, color],
                                    }));
                                }}
                            />
                            <label
                                htmlFor={`color-${color}`}
                                className={`tasks-filters__color-label ${
                                    filterOptions.selectedColors.includes(color)
                                        ? "tasks-filters__color-label--selected"
                                        : ""
                                }`}
                                style={{ backgroundColor: getPaletteColor(color) }}
                            />
                        </div>
                    ))}
                    <button className="tasks-filters__remove-selected-colors" type="button" onClick={clearColorFilters}>
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskFilter;
