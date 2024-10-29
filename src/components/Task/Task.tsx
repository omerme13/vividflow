import { useState } from "react";
import { TaskColors, TaskProps } from "./Task.types";
import { CheckIcon, ClockIcon, PaletteIcon, ShowMoreIcon, TrashIcon } from "@/assets/icons";
import { getPaletteColor } from "@/utils/styles";
import TaskAction from "./components/TaskAction/TaskAction";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import { useTask } from "@/context/TaskContext";

import "./Task.scss";

export default function Task({ task }: TaskProps) {
    const { id, text, label, color = TaskColors.Gray } = task;
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    const { updateTask, deleteTask } = useTask(id);

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
            <div className="task__actions">
                <TaskAction icon={CheckIcon} action={() => {}} />
                <TaskAction icon={ClockIcon} action={() => {}} />
                <TaskAction icon={TrashIcon} action={deleteTask} isWarning />
                <TaskAction icon={PaletteIcon} action={togglePalette} />
                {isPaletteOpen && (
                    <ColorPalette updateTaskColor={handleUpdateColor} onClose={() => setIsPaletteOpen(false)} />
                )}
                <TaskAction icon={ShowMoreIcon} action={() => {}} />
            </div>
        </div>
    );
}
