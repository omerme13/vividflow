import { MouseEvent, useState } from "react";
import { TaskColors, TaskProps } from "./Task.types";
import { CheckIcon, ClockIcon, PaletteIcon, TrashIcon } from "@/assets/icons";
import { getClassWithModifier, getPaletteColor } from "@/utils/styles";
import TaskAction from "./components/TaskAction/TaskAction";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import { useTask } from "@/context/TaskContext";
import Tooltip from "@/components/Tooltip";
import DatePicker from "./components/DatePicker/DatePicker";
import Popover from "@/components/Popover";

import "./Task.scss";

export default function Task({ task, onEdit, isGridMode }: TaskProps) {
    const { id, text, label, color = TaskColors.Gray, isCompleted, dueDate } = task;
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const { updateTask, deleteTask, filterByLabel, toggleTaskCompletion, setTaskDueDate } = useTask(id);

    const isColorSelected = color !== TaskColors.Gray;

    const togglePalette = () => setIsPaletteOpen((prev) => !prev);

    const handleUpdateColor = (newColor: TaskColors) => {
        updateTask({ ...task, color: newColor });
        setIsPaletteOpen(false);
    };

    const handleLabelClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        filterByLabel();
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

                <Popover
                    trigger={
                        <TaskAction
                            icon={PaletteIcon}
                            action={togglePalette}
                            isActive={isColorSelected}
                            tooltipContent={isColorSelected ? color : "choose a color"}
                        />
                    }
                    onOpenChange={setIsPaletteOpen}
                    isOpen={isPaletteOpen}
                >
                    <ColorPalette updateTaskColor={handleUpdateColor} onClose={() => setIsPaletteOpen(false)} />
                </Popover>
                <DatePicker
                    date={dueDate}
                    onChange={setTaskDueDate}
                    trigger={
                        <TaskAction
                            icon={ClockIcon}
                            tooltipContent={
                                dueDate ? `time set to ${new Date(dueDate).toLocaleString("en-GB")}` : "set time"
                            }
                            isActive={!!dueDate}
                        />
                    }
                />
                <TaskAction icon={TrashIcon} action={deleteTask} isWarning tooltipContent="delete" />
            </div>
        </div>
    );
}
