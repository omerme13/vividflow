import { MouseEvent, useState } from "react";
import { TaskColors, TaskProps } from "./Task.types";
import { CheckIcon, ClockIcon, PaletteIcon, TrashIcon } from "@/assets/icons";
import { getPaletteColor } from "@/utils/styles";
import TaskAction from "./components/TaskAction/TaskAction";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import { useTask } from "@/context/TaskContext";
import Tooltip from "@/components/Tooltip";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"; // Add this import
import "./Task.scss";

export default function Task({ task, onEdit }: TaskProps) {
    const { id, text, label, color = TaskColors.Gray, isCompleted, dueDate } = task;
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const { updateTask, deleteTask, filterByLabel, toggleTaskCompletion, setTaskDueDate } = useTask(id);

    const togglePalette = () => setIsPaletteOpen((prev) => !prev);
    const toggleDatePicker = (e: MouseEvent) => {
        e.stopPropagation();
        setIsDatePickerOpen((prev) => !prev);
    };

    const handleUpdateColor = (newColor: TaskColors) => {
        updateTask({ ...task, color: newColor });
        setIsPaletteOpen(false);
    };

    const handleLabelClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        filterByLabel();
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setTaskDueDate(date);
            setIsDatePickerOpen(false);
        }
    };

    return (
        <div className="task" onClick={onEdit}>
            <div className="task__color" style={{ background: getPaletteColor(color) }} />
            <div className="task__text">{text}</div>
            {label && (
                <Tooltip content={`filter by ${label}`}>
                    <div className="task__label" onClick={handleLabelClick}>
                        {label}
                    </div>
                </Tooltip>
            )}
            <div className="task__actions" onClick={(e) => e.stopPropagation()}>
                <TaskAction
                    icon={CheckIcon}
                    action={toggleTaskCompletion}
                    tooltipContent={`mark as ${isCompleted ? "undone" : "done"}`}
                    // isActive={isCompleted}
                />
                <TaskAction icon={ClockIcon} action={toggleDatePicker} tooltipContent="set time" isActive={!!dueDate} />
                <TaskAction icon={PaletteIcon} action={togglePalette} tooltipContent="choose a color" />
                {isPaletteOpen && (
                    <ColorPalette updateTaskColor={handleUpdateColor} onClose={() => setIsPaletteOpen(false)} />
                )}
                <TaskAction icon={TrashIcon} action={deleteTask} isWarning tooltipContent="delete" />
                {isDatePickerOpen && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <DatePicker
                            selected={dueDate ? new Date(dueDate) : null}
                            onChange={handleDateChange}
                            dateFormat="dd-mm-yyyy"
                            minDate={new Date()}
                            inline
                            onClickOutside={() => setIsDatePickerOpen(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
