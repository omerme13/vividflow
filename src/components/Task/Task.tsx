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

const markAsDone = () => {};

const setDueDate = () => {};

const addLabel = () => {};

const showMore = () => {};

export default function Task({
    task: { id, text, label, color = TaskColors.Gray, isOnKanban, isCompleted, dueDate }
}: TaskProps) {
    const [taskColor, setTaskColor] = useState<TaskColors>(color);
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    const togglePalette = () => setIsPaletteOpen((value) => !value);
	const { deleteTask } = useTaskContext();

    return (
        <div className="task">
            <div className="task__color" style={{ background: getPaletteColor(taskColor) }} />
            <div className="task__text">{text}</div>
            {label && <div className="task__label">{label}</div>}
            <div className="task__middle">
                <div className="task__actions">
                    <TaskAction icon={CheckIcon} action={markAsDone} />
                    <TaskAction icon={ClockIcon} action={setDueDate} />
                    <TaskAction icon={LabelIcon} action={addLabel} />
                    <TaskAction icon={TrashIcon} action={() => deleteTask(id)} isWarning />
                    <TaskAction icon={PaletteIcon} action={togglePalette} />
                    {isPaletteOpen && (
                        <ColorPalette setTaskColor={setTaskColor} onClose={() => setIsPaletteOpen(false)} />
                    )}
                    <TaskAction icon={ShowMoreIcon} action={showMore} />
                </div>
            </div>
        </div>
    );
}
