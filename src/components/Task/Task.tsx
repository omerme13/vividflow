import { MouseEvent, useState } from "react";
import { TaskColors, TaskProps } from "./Task.types";
import { CheckIcon, ClockIcon, PaletteIcon, TrashIcon } from "@/assets/icons";
import { getPaletteColor } from "@/utils/styles";
import TaskAction from "./components/TaskAction/TaskAction";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import { useTask } from "@/context/TaskContext";

import "./Task.scss";

export default function Task({ task, onEdit }: TaskProps) {
    const { id, text, label, color = TaskColors.Gray } = task;
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    const { updateTask, deleteTask } = useTask(id);

    const togglePalette = () => setIsPaletteOpen((prev) => !prev);

    const handleUpdateColor = (newColor: TaskColors) => {
        updateTask({ ...task, color: newColor });
        setIsPaletteOpen(false);
    };

    const handleLabelClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    };

    return (
        <div className="task" onClick={onEdit}>
            <div className="task__color" style={{ background: getPaletteColor(color) }} />
            <div className="task__text">{text}</div>
            {label && (
                <div className="task__label" onClick={handleLabelClick}>
                    {label}
                </div>
            )}
            <div className="task__actions" onClick={(e) => e.stopPropagation()}>
                <TaskAction icon={CheckIcon} action={() => {}} tooltipContent="mark as done" />
                <TaskAction icon={ClockIcon} action={() => {}} tooltipContent="set time" />
                <TaskAction icon={PaletteIcon} action={togglePalette} tooltipContent="choose a color" />
                {isPaletteOpen && (
					<ColorPalette updateTaskColor={handleUpdateColor} onClose={() => setIsPaletteOpen(false)} />
                )}
				<TaskAction icon={TrashIcon} action={deleteTask} isWarning tooltipContent="delete" />
            </div>
        </div>
    );
}
