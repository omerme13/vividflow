import { MouseEvent, useState } from "react";
import { TaskColors, TaskProps } from "./Task.types";
import { CheckIcon, ClockIcon, PaletteIcon, TrashIcon } from "@/assets/icons";
import { getClassWithModifier, getPaletteColor } from "@/utils/styles";
import TaskAction from "./components/TaskAction/TaskAction";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import { useTask } from "@/context/TaskContext";
import Tooltip from "@/components/Tooltip";
import DatePicker from "react-datepicker";
import Popover from "@/components/Popover";

import "react-datepicker/dist/react-datepicker.css";
import "./Task.scss";

export default function Task({ task, onEdit, isGridMode }: TaskProps) {
    const { id, text, label, color = TaskColors.Gray, isCompleted, dueDate } = task;
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
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

    const handleDateChange = (date: Date | null, e) => {
        if (date) {
            setTaskDueDate(date);
        }

        if (!e) {
            setIsDatePickerOpen(false);
        }
    };

    const handleClearDate = (e: MouseEvent) => {
        e.stopPropagation();
        setTaskDueDate(undefined);
        setIsDatePickerOpen(false);
    };

    return (
        <div className={getClassWithModifier("task", "list-mode", !isGridMode)} onClick={onEdit}>
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
                <Popover
                    isOpen={isDatePickerOpen}
                    onOpenChange={setIsDatePickerOpen}
                    marginFromBorders={190}
                    trigger={
                        <TaskAction
                            icon={ClockIcon}
                            tooltipContent={
                                dueDate ? `time set to ${new Date(dueDate).toLocaleString("en-GB")}` : "set time"
                            }
                            isActive={!!dueDate}
                        />
                    }
                >
                    <div className="datepicker-wrapper">
                        {dueDate && (
                            <button
                                className="datepicker-wrapper__clear-button"
                                onClick={handleClearDate}
                                type="button"
                            >
                                <TrashIcon />
                                <span>Clear date</span>
                            </button>
                        )}
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
