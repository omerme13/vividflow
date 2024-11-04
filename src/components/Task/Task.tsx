import { MouseEvent, useState } from "react";
import { TaskColors, TaskProps } from "./Task.types";
import { CheckIcon, ClockIcon, PaletteIcon, TrashIcon } from "@/assets/icons";
import { getPaletteColor } from "@/utils/styles";
import TaskAction from "./components/TaskAction/TaskAction";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import { useTask } from "@/context/TaskContext";
import Tooltip from "@/components/Tooltip";
import DatePicker from "react-datepicker";
import Popover from "@/components/Popover";

import "react-datepicker/dist/react-datepicker.css";
import "./Task.scss";

export default function Task({ task, onEdit }: TaskProps) {
    const { id, text, label, color = TaskColors.Gray, isCompleted, dueDate } = task;
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const { updateTask, deleteTask, filterByLabel, toggleTaskCompletion, setTaskDueDate } = useTask(id);

    const togglePalette = () => setIsPaletteOpen((prev) => !prev);

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
                    isActive={isCompleted}
                />

                <TaskAction icon={PaletteIcon} action={togglePalette} tooltipContent="choose a color" />
                {isPaletteOpen && (
                    <ColorPalette updateTaskColor={handleUpdateColor} onClose={() => setIsPaletteOpen(false)} />
                )}
                <Popover trigger={<TaskAction icon={ClockIcon} tooltipContent="set time" isActive={!!dueDate} />}>
                    <div className="datepicker-wrapper">
                        <DatePicker
                            selected={dueDate ? new Date(dueDate) : null}
                            onChange={handleDateChange}
                            dateFormat="dd-mm-yyyy"
                            minDate={new Date()}
                            inline
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeCaption="Time"
                            timeIntervals={30}
                        />
                    </div>
                </Popover>
                <TaskAction icon={TrashIcon} action={deleteTask} isWarning tooltipContent="delete" />
            </div>
        </div>
    );
}
