import { useTaskContext } from "@/context/TaskContext";
import ColorPicker from "@/components/ColorPicker";
import { TaskColors } from "@/types/task";
import CustomSelect from "../CustomSelect";

import "./TasksFilters.scss";

export default function TaskFilter()  {
    const { labels, filterOptions, setFilterOptions, clearColorFilters } = useTaskContext();

    const labelOptions = labels.map((label) => ({
        value: label,
        label: label,
    }));

    return (
        <div className="tasks-filters">
            <div className="tasks-filters__section">
                <h3 className="tasks-filters__title">Labels</h3>
                <CustomSelect
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
                />
            </div>

            <div className="tasks-filters__section">
                <h3 className="tasks-filters__title">Colors</h3>
                <ColorPicker
                    colors={filterOptions.selectedColors}
                    onChangeColors={(colors: TaskColors[]) => {
                        setFilterOptions((prev) => ({
                            ...prev,
                            selectedColors: colors,
                        }));
                    }}
                    isMulti
                    onClear={clearColorFilters}
                />
            </div>
        </div>
    );
};
