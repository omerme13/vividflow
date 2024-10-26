import { useState } from "react";
import { TaskColors, TaskProps } from "./Task.types";
import CheckIcon from "@/assets/icons/check.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";
import LabelIcon from "@/assets/icons/label.svg?react";
import ShowMoreIcon from "@/assets/icons/show-more.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import PaletteIcon from "@/assets/icons/palette.svg?react";
import { getPaletteColor } from "@/utils/styles";
import TaskAction from "./components/TaskAction/TaskAction";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import { useTaskContext } from "@/context/TaskContext";

import "./Task.scss";

export default function Task({ task }: TaskProps) {
    const { id, text, label, color = TaskColors.Gray } = task;
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    const { updateTask, deleteTask } = useTaskContext();

    const togglePalette = () => setIsPaletteOpen((prev) => !prev);

    const handleUpdateColor = (newColor: TaskColors) => {
        updateTask({ ...task, color: newColor });
        setIsPaletteOpen(false);
    };

    return (
        <div className="task">
            <div className="task__color" style={{ background: getPaletteColor(color) }} />
            <div className="task__text">{text}</div>
            {label && <div className="task__label">{label}</div>}
            <div className="task__middle">
                <div className="task__actions">
                    <TaskAction icon={CheckIcon} action={() => {}} />
                    <TaskAction icon={ClockIcon} action={() => {}} />
                    <TaskAction icon={LabelIcon} action={() => {}} />
                    <TaskAction icon={TrashIcon} action={() => deleteTask(id)} isWarning />
                    <TaskAction icon={PaletteIcon} action={togglePalette} />
                    {isPaletteOpen && (
                        <ColorPalette updateTaskColor={handleUpdateColor} onClose={() => setIsPaletteOpen(false)} />
                    )}
                    <TaskAction icon={ShowMoreIcon} action={() => {}} />
                </div>
            </div>
        </div>
    );
}
