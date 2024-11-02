import Select from "react-select";
import { useTaskContext } from "@/context/TaskContext";
import { TaskColors } from "@/components/Task";
import "./TasksFilters.scss";

const colorOptions = Object.values(TaskColors).map((color: TaskColors) => ({
    value: color,
    label: color,
}));

const TaskFilter = () => {
    const { labels, filterOptions, setFilterOptions } = useTaskContext();

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
                />
            </div>

            <div className="tasks-filters__section">
                <h3 className="tasks-filters__title">Colors</h3>
                <Select
                    isMulti
                    options={colorOptions}
                    value={colorOptions.filter((option) => filterOptions.selectedColors.includes(option.value))}
                    onChange={(selected) => {
                        setFilterOptions((prev) => ({
                            ...prev,
                            selectedColors: selected ? selected.map((option) => option.value) : [],
                        }));
                    }}
                    placeholder="Select colors"
                    className="tasks-filters__select tasks-filters__select--colors"
                    classNamePrefix="tasks-filters-select"
                />
            </div>
        </div>
    );
};

export default TaskFilter;
