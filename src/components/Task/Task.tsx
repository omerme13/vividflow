import { MouseEvent, useState } from "react";
import { TaskProps } from "./Task.types";
import { CheckIcon, ClockIcon, PaletteIcon, TrashIcon, UndoIcon } from "@/assets/icons";
import { getClassWithModifier, getPaletteColor } from "@/utils/styles";
import TaskAction from "./components/TaskAction/TaskAction";
import { useTask } from "@/context/TaskContext";
import Tooltip from "@/components/Tooltip";
import DatePicker from "./components/DatePicker/DatePicker";
import Popover from "@/components/Popover";
import ColorPickerQuick from "./components/ColorPickerQuick/ColorPickerQuick";
import useDeleteTask from "@/hooks/useDeleteTask";
import { format } from "date-fns";
import { TaskColors } from "@/types/task";
import { usePreferences } from "@/context/PreferenceContext";

import "./Task.scss";

export default function Task({ task, onEdit, isGridMode }: TaskProps) {
    const { id, text, label, color = TaskColors.Gray, completedAt, dueDate } = task;
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const { updateTask, filterByLabel, toggleTaskCompletion, setTaskDueDate } = useTask(id);
    const handleDeleteTask = useDeleteTask(id);
	const { preferences: { dateFormat, hourFormat }} = usePreferences();
	
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

    const handleClickOnCompleted = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        toggleTaskCompletion();
    };

    return (
        <div className={getClassWithModifier("task", "list-mode", !isGridMode)} onClick={onEdit}>
            <div className="task__color" style={{ background: getPaletteColor(color) }} />
            <div className="task__text">{text}</div>
            {label && (
                <Tooltip content={`Toggle filter by ${label}`}>
                    <div className="task__label" onClick={handleLabelClick}>
                        {label}
                    </div>
                </Tooltip>
            )}
            <div className="task__actions" onClick={(e) => e.stopPropagation()}>
                <TaskAction
                    icon={CheckIcon}
                    action={toggleTaskCompletion}
                    tooltipContent={`mark as ${completedAt ? "undone" : "done"}`}
                    isActive={!!completedAt}
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
                    <ColorPickerQuick updateTaskColor={handleUpdateColor} onClose={() => setIsPaletteOpen(false)} />
                </Popover>
                <DatePicker
                    date={dueDate ? new Date(dueDate) : undefined}
                    onChange={setTaskDueDate}
                    trigger={
                        <TaskAction
                            icon={ClockIcon}
                            tooltipContent={
                                dueDate ? `time set to ${format(new Date(dueDate), `${dateFormat} ${hourFormat}`)}` : "set time"
                            }
                            isActive={!!dueDate}
                        />
                    }
                />
                <TaskAction icon={TrashIcon} action={handleDeleteTask} isWarning tooltipContent="delete" />
            </div>
            {!!completedAt && (
                <div className="task__cover-done" onClick={handleClickOnCompleted}>
                    <UndoIcon className="task__undo-icon" width={40} height={40} />
                </div>
            )}
        </div>
    );
}
